set -e

# Set branch to release
RDKIT_BRANCH="Release_$RDKIT_DASH_VERSION"
RDKIT_VERSION=${RDKIT_DASH_VERSION//_0/_}
RDKIT_VERSION=${RDKIT_VERSION//_/.}
SEMVER_VERSION="$SEMVER_VERSION"
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
mkdir -p $MINIMALLIB_OUTPUT_PATH

# legacy minimallib output path
LEGACY_MINIMALLIB_OUTPUT_PATH="Code/MinimalLib/dist"
rm -rf $LEGACY_MINIMALLIB_OUTPUT_PATH
mkdir -p $LEGACY_MINIMALLIB_OUTPUT_PATH 

# Build distribution files
DOCKER_BUILDKIT=1 docker build --no-cache -f Dockerfile --build-arg RDKIT_BRANCH=$RDKIT_BRANCH -o $MINIMALLIB_OUTPUT_PATH .

# Make dist files executable
chmod a+rwx $MINIMALLIB_OUTPUT_PATH/RDKit_minimal.js
chmod a+rwx $MINIMALLIB_OUTPUT_PATH/RDKit_minimal.wasm

# Add a copy of the distribution files at the original rdkit location
# for backwards compatibility
cp $MINIMALLIB_OUTPUT_PATH/RDKit_minimal.js $LEGACY_MINIMALLIB_OUTPUT_PATH/RDKit_minimal.js
cp $MINIMALLIB_OUTPUT_PATH/RDKit_minimal.wasm $LEGACY_MINIMALLIB_OUTPUT_PATH/RDKit_minimal.wasm

# Move docs file in dist folder for demos to work properly
cp docs/demo.html $MINIMALLIB_OUTPUT_PATH/demo.html
cp docs/GettingStartedInJS.html $MINIMALLIB_OUTPUT_PATH/GettingStartedInJS.html

# Log build completed
echo "Build completed"
echo "MinimalLib distribution files are at $MINIMALLIB_OUTPUT_PATH"

# Move typescript files to dist folder
cp typescript/index.d.ts $MINIMALLIB_OUTPUT_PATH/index.d.ts

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
