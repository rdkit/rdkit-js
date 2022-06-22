# RDKit for JavaScript Examples

The following sub-repository is dedicated to showcasing the functionalities of RDKit.js via plain javascript examples, i.e. without any web framework or libraries.

The examples are live at [rdkitjs.com](https://www.rdkitjs.com).

If you are looking for examples leveraging modern web framework, follow the link to their related sub-repositories:

- [React.js Examples](https://github.com/MichelML/RDKit.js/tree/master/examples/react)

## Contributing

First, fork the RDKit.js GitHub repository and run the remaining instructions from your fork.

### Dependencies

- Git
- Node >= 14.x
- Yarn 1.22.19

### Installation and local development server

Run the following command to install the RDKit.js project.

```bash
git clone https://github.com/<name of your fork>/RDKit.js.git && \
cd RDKit.js && \
yarn install
```

Once the project is installed, run the following command at the root of the RDKit.js repository to start the development server:

```bash
npm run javascript:start
```

You are now ready to develop.

### Contributing examples

All javascript examples are written inline in the index.html file at `./examples/javascript/index.html`.

To add a new example, make sure to respect the following checklist:

1. [ ] Start a new git branch from the master branch and give it a meaningful name
2. [ ] An example should have the following components to it:

- [ ] A textarea section containing the executable code.
- [ ] A text explanation of what the example is about.
- [ ] A button "Run" to execute the code.
- [ ] An output html element where the result of the executed code will be displayed.
- [ ] A dedicated side navigation entry under the `<aside />` html element.

3. [ ] Make sure your example respects the styling conventions using [Bulma](https://bulma.io/).
4. [ ] Make sure you formatted your code with `npm run format`.

Once you're done, make a pull request to the master branch of the main RDKit.js repository, and wait for the review!
