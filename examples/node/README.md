# RDKit for Node.js Examples

The following sub-repository is dedicated to showcasing the functionalities of RDKit.js on the server-side in a Node.js environment.

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
yarn install && \
cd examples/node
```

You can now run all the available examples in this folder with the following command:

```bash
node examples/<name_of_the_example>.js
```

Example for the descriptors example would be:

```bash
node examples/descriptors_calculation.js
```

### Contributing examples

All examples are written in the `./examples/node/examples` folder.

To add a new example, make sure to respect the following checklist:

1. [ ] Start a new git branch from the master branch and give it a meaningful name
2. [ ] Create a new js file in the `./examples/node/examples`, give it a meaningful name, and implement your node example in this file.
3. [ ] Make sure you formatted your code with `npm run format`.

Refer to any other react example in `examples/node/examples` if you are unusure about any of the steps above.

Once you're done, make a pull request to the master branch of the main RDKit.js repository, and wait for the review!
