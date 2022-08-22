# RDKit for JavaScript (Vue Examples)

The following sub-repository is dedicated to showcasing a few examples using RDKit.js with [Vue.js](https://vuejs.org/).

The examples use Vue 3 with Typescript, utilizing the Vue's Composition API and Single-File Component features.

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
npm run dev
```

You are now ready to develop.

### Contributing examples

All Vue.js examples are written in the `./examples/vue/components/examples` folder.

To add a new example, make sure to respect the following checklist:

1. [ ] Start a new git branch from the master branch and give it a meaningful name
2. [ ] Create a new .vue file in the `./examples/vue/components/examples`, give it a meaningful name, and implement your Vue example in this file.
3. [ ] Import your example component in `./examples/vue/App.vue` and add it at the end of the examples list already present in this file.
4. [ ] Reference your example in the SideNav.vue component, again following the convention of other examples (this step will be removed in the future).
5. [ ] Make sure your example respects the styling conventions using [Bulma](https://bulma.io/)
6. [ ] Make sure you formatted your code with `npm run format`.

Refer to any other Vue example in `examples/vue/components/examples` if you are unusure about any of the steps above.

Once you're done, make a pull request to the master branch of the main RDKit.js repository, and wait for the review!
