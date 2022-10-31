# RDKit for JavaScript (Angular Examples)

The following sub-repository is dedicated to showcasing a few examples using RDKit.js with [Angular](https://angular.io/).

The examples are live at [angular.rdkitjs.com](https://angular.rdkitjs.com).

If you didn't go through the plain javascript examples already, it is recommended to do so before going forward:

- [JavaScript Examples](https://github.com/rdkit/rdkit-js/tree/master/examples/javascript)

## Contributing

First, fork the RDKit.js GitHub repository and run the remaining instructions from your fork.

### Dependencies

- Git
- Node >= 14.x
- Yarn 1.22.19

### Installation and local development server

Run the following command to install the RDKit.js project.

```bash
git clone https://github.com/<name of your fork>/rdkit-js.git && \
cd rdkit-js && \
yarn install
```

Once the project is installed, run the following command at the root of the RDKit.js repository to start the development server:

```bash
npm run angular:start
```

You are now ready to develop.

### Contributing examples

All angular.js examples are written in the `./examples/angular/examples` folder.

To add a new example, make sure to respect the following checklist:

1. [ ] Start a new git branch from the master branch and give it a meaningful name
2. [ ] Use `ng g c examples/examples/<your-example-name>` to generate a new component for your example. Use kebab-case for naming files. You will see a folder generated with a ts file, a HTML file and a css file. 
3. [ ] Add your component to [the main examples file](/examples/angular/src/app/examples/examples.component.html) under the appropriate section.
4. [ ] Reference your example in SideBarComponent, again following the convention of other examples (this step will be removed in the future).
5. [ ] Make sure your example respects the styling conventions using [Bulma](https://bulma.io/)
6. [ ] Make sure you formatted your code with `npm run format`.

Refer to any other Angular example in `examples/angular/examples` if you are unusure about any of the steps above.

Once you're done, make a pull request to the master branch of the main RDKit.js repository, and wait for the review!
