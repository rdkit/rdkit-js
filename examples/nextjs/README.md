This is a minimal Rdkit [Next.js](https://nextjs.org/) project.

## A note on the Next.js config

In order to bootstrap Rdkit in Next.js, you'll need to modify the default webpack config in next.config.js.

CopyWebpackPlugin is used to copy RDKit_minimal.wasm into /public folder.

'fs' module needs to be polyfilled in the browser.

## MoleculeStructure React component

MoleculeStructure contains an example react component that makes uses of Rdkit.
It can only be rendered via [Dyanmic Import with no SSR](https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr).

## Running the example on your local machine  

Simply run the following command at the root of the example:  

```bash  
npm install && \
npm run build && \
npm start # or npm start -- -p <a different port than the default 3000>, example: npm start -- -p 3001
```
