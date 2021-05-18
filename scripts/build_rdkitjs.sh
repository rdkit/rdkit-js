set -e

# Clean up temp files if exists
rm -rf rdkit Dockerfile

# Set branch to release
RDKIT_BRANCH=${1:-master}

# Retrieve Dockerfile from main rdkit repository
git clone https://github.com/rdkit/rdkit.git
cd rdkit
git fetch --all --tags
git checkout $RDKIT_BRANCH
cp Code/MinimalLib/docker/Dockerfile ../Dockerfile
cd ..
rm -rf rdkit

# Clean and create distribution folder
MINIMALLIB_OUTPUT_PATH="dist"
rm -rf $MINIMALLIB_OUTPUT_PATH
mkdir -p $MINIMALLIB_OUTPUT_PATH

# Build distribution files
DOCKER_BUILDKIT=1 docker build --no-cache -f Dockerfile --build-arg RDKIT_BRANCH=$RDKIT_BRANCH -o $MINIMALLIB_OUTPUT_PATH .
rm Dockerfile

# Make dist files executable
chmod a+rwx $MINIMALLIB_OUTPUT_PATH/RDKit_minimal.js
chmod a+rwx $MINIMALLIB_OUTPUT_PATH/RDKit_minimal.wasm

# Move docs file in dist folder for demos to work properly
cp docs/demo.html dist/demo.html
cp docs/GettingStartedInJS.html dist/GettingStartedInJS.html

# Log build completed
echo "Build completed"
echo "MinimalLib distribution files are at $MINIMALLIB_OUTPUT_PATH"
