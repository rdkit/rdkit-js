/**
 * code-example-generator.js
 * 
 * This NodeJS file is designed to generate the code examples look up object.
 * 
 */

const fs = require('fs');
const path = require('path')
const dirpath = "./app/examples"
const ignoreHeader = "// @ignore-example-code-gen"


function getDirectoryAsObject(dir) {
  let obj = {}
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      obj = {...obj, ...getDirectoryAsObject(fullPath)};
    } else {
      const fileText = fs.readFileSync(fullPath).toString()
      if (!fileText.startsWith(ignoreHeader)) {
        obj[file] = fileText 
      }
    }
  });
  return obj
}



fs.writeFileSync('./app/examples/code-examples.ts', `
${ignoreHeader}
// Generated by code-example-generator.js
export const examplesCode: {[key: string]:string}  = ${JSON.stringify(getDirectoryAsObject(dirpath))}
`)