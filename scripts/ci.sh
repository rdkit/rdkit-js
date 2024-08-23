set -e

# Set branch to release
RDKIT_BRANCH="$RDKIT_BRANCH"
MINIMALLIB_OUTPUT_PATH="dist"

# Build distribution files
DOCKER_BUILDKIT=1 docker build --no-cache --platform=linux/amd64 -f Dockerfile --build-arg RDKIT_BRANCH=$RDKIT_BRANCH -o $MINIMALLIB_OUTPUT_PATH .
