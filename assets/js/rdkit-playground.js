/* RDKit Playground — widget initializer
 *
 * Usage: place anywhere in a page with layout: playground
 *
 *   <script type="text/rdkit-example">
 *   var mol = RDKitModule.get_mol('CCO');
 *   document.getElementById('output').innerHTML = mol.get_svg();
 *   mol.delete();
 *   </script>
 *
 * initPlayground() transforms every such tag into an editable
 * CodeMirror widget with scoped console + visual output panels.
 * document.getElementById('output') is patched per-widget during
 * execution so user code is identical to production code.
 */

(function () {
  "use strict";

  var widgetCount = 0;

  function initPlayground() {
    var examples = document.querySelectorAll('pre.rdkit-example');
    examples.forEach(function (scriptTag) {
      buildWidget(scriptTag);
    });
  }

  function buildWidget(scriptTag) {
    var i = widgetCount++;
    var code = scriptTag.textContent.trim();
    var outputId = "rdkit-output-" + i;
    var consoleId = "rdkit-console-" + i;

    /* Build DOM */
    var widget = document.createElement("div");
    widget.className = "rdkit-widget";

    var textarea = document.createElement("textarea");
    widget.appendChild(textarea);

    var toolbar = document.createElement("div");
    toolbar.className = "rdkit-widget-toolbar";
    toolbar.innerHTML =
      '<button class="rdkit-run-btn">Run &#9654;</button>' +
      '<span class="rdkit-shortcut">Ctrl+Enter</span>';
    widget.appendChild(toolbar);

    var consoleEl = document.createElement("div");
    consoleEl.id = consoleId;
    consoleEl.className = "rdkit-console";
    widget.appendChild(consoleEl);

    var visualEl = document.createElement("div");
    visualEl.id = outputId;
    visualEl.className = "rdkit-visual";
    widget.appendChild(visualEl);

    scriptTag.parentNode.insertBefore(widget, scriptTag);
    scriptTag.parentNode.removeChild(scriptTag);

    /* CodeMirror */
    var cm = CodeMirror.fromTextArea(textarea, {
      mode: "javascript",
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      indentUnit: 2,
      tabSize: 2,
      indentWithTabs: false,
      viewportMargin: Infinity,
      extraKeys: {
        "Ctrl-Enter": function () {
          runWidget(cm, consoleEl, visualEl);
        },
        "Cmd-Enter": function () {
          runWidget(cm, consoleEl, visualEl);
        },
        Tab: function (cm) {
          cm.replaceSelection("  ", "end");
        },
      },
    });

    cm.setValue(code);

    toolbar
      .querySelector(".rdkit-run-btn")
      .addEventListener("click", function () {
        runWidget(cm, consoleEl, visualEl);
      });

    /* Expose for auto-run after RDKit loads */
    widget._run = function () {
      runWidget(cm, consoleEl, visualEl);
    };
  }

  function runWidget(cm, consoleEl, visualEl) {
    consoleEl.innerHTML = "";
    visualEl.innerHTML = "";
    consoleEl.classList.remove("has-output");
    visualEl.classList.remove("has-output");

    /* Console intercept */
    var origLog = console.log;
    var origWarn = console.warn;
    var origError = console.error;

    function appendLog(args, cls) {
      var line = document.createElement("div");
      line.className = cls;
      line.textContent = Array.prototype.slice
        .call(args)
        .map(function (a) {
          return typeof a === "object" ? JSON.stringify(a, null, 2) : String(a);
        })
        .join(" ");
      consoleEl.appendChild(line);
      consoleEl.classList.add("has-output");
      consoleEl.scrollTop = consoleEl.scrollHeight;
    }

    console.log = function () {
      origLog.apply(console, arguments);
      appendLog(arguments, "log-line");
    };
    console.warn = function () {
      origWarn.apply(console, arguments);
      appendLog(arguments, "log-warn");
    };
    console.error = function () {
      origError.apply(console, arguments);
      appendLog(arguments, "log-error");
    };

    /* getElementById patch — redirect 'output' to this widget's visual panel */
    var origGetEl = document.getElementById.bind(document);
    document.getElementById = function (id) {
      if (id === "output") {
        visualEl.classList.add("has-output");
        return visualEl;
      }
      return origGetEl(id);
    };

    try {
      // User code runs here. RDKitModule is a page-level global.
      // eslint-disable-next-line no-eval
      eval(cm.getValue()); // jshint ignore:line
    } catch (e) {
      appendLog([e.toString()], "log-error");
    } finally {
      console.log = origLog;
      console.warn = origWarn;
      console.error = origError;
      document.getElementById = origGetEl;
    }
  }

  /* Run on DOMContentLoaded, then auto-run widgets once RDKit is ready */
  document.addEventListener("DOMContentLoaded", function () {
    initPlayground();

    /* RDKit init is triggered by the layout; widgets listen for this event */
    document.addEventListener("rdkit-ready", function () {
      document.querySelectorAll(".rdkit-widget").forEach(function (w) {
        if (typeof w._run === "function") w._run();
      });
    });
  });
})();
