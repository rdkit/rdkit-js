#!/bin/bash

set -e

# Set tag to release
RDKIT_DASH_VERSION=${RDKIT_DASH_VERSION:-"2026_03_3"}
RDKIT_TAG="Release_$RDKIT_DASH_VERSION"
RDKIT_VERSION=${RDKIT_DASH_VERSION//_0/_}
RDKIT_VERSION=${RDKIT_VERSION//_/.}
SEMVER_VERSION="$SEMVER_VERSION"
EMSDK_VERSION=${EMSDK_VERSION:-"latest"}
NPM_RELEASE_VERSION="$RDKIT_VERSION-$SEMVER_VERSION"

# make sure true/false is lowercase
BETA="${BETA,,}"

if [ "$BETA" = "true" ]; then
    RDKIT_VERSION="$RDKIT_VERSION-beta"
fi

echo $RDKIT_DASH_VERSION
echo $RDKIT_VERSION

# Clean and create distribution folder
MINIMALLIB_OUTPUT_PATH="dist"
rm -rf $MINIMALLIB_OUTPUT_PATH

# legacy minimallib output path
LEGACY_MINIMALLIB_OUTPUT_PATH="Code/MinimalLib/dist"
rm -rf $LEGACY_MINIMALLIB_OUTPUT_PATH
mkdir -p $LEGACY_MINIMALLIB_OUTPUT_PATH

# Build distribution files
DOCKER_BUILDKIT=1 docker build --platform=linux/amd64 -f Dockerfile \
    --build-arg RDKIT_TAG=$RDKIT_TAG \
    --build-arg EMSDK_VERSION=$EMSDK_VERSION \
    -o typescript/generated .

# Set permissions for generated files
# chmod a+rw typescript/generated/RDKit_minimal.js
# chmod a+rw typescript/generated/RDKit_minimal.wasm

# Add a copy of the distribution files at the original rdkit location
# for backwards compatibility
cp typescript/generated/RDKit_minimal.js $LEGACY_MINIMALLIB_OUTPUT_PATH/RDKit_minimal.js
cp typescript/generated/RDKit_minimal.wasm $LEGACY_MINIMALLIB_OUTPUT_PATH/RDKit_minimal.wasm

# Compile TypeScript files
npx tsup

# Log build completed
echo "Build completed"
echo "MinimalLib distribution files are at $MINIMALLIB_OUTPUT_PATH"

# Move docs file in dist folder for demos to work properly
cp docs/demo.html $MINIMALLIB_OUTPUT_PATH/demo.html
cp docs/GettingStartedInJS.html $MINIMALLIB_OUTPUT_PATH/GettingStartedInJS.html

# Pre-publish
sed -i '/"private": true/d' ./package.json
npm --no-git-tag-version --allow-same-version version $NPM_RELEASE_VERSION
echo "registry=https://registry.npmjs.org/" > .npmrc
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" >> .npmrc

# Publish
if [ "$BETA" = "true" ]; then
    NPM_TOKEN=$NPM_TOKEN npm publish --beta --access public
else
    NPM_TOKEN=$NPM_TOKEN npm publish --access public
fi
