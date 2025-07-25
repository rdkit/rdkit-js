# Example usage of this Dockerfile:
# (the build-arg arguments are all optional)
#
# 1. cd to Code/MinimalLib/docker
# cd Code/MinimalLib/docker
#
# 2. build the JS and WASM libraries
#    (the build-arg arguments are all optional; in the following
#     example we select the more performant, though still experimental,
#     native WASM exception handling):
# docker build -t rdkit-minimallib --network=host \
#  --build-arg "RDKIT_GIT_URL=https://github.com/myfork/rdkit.git" \
#  --build-arg "RDKIT_BRANCH=mybranch" \
#  --build-arg "EXCEPTION_HANDLING=-fwasm-exceptions".
#
# 3. create a temporary container and copy built libraries
#    from the container to your local filesystem, then destroy
#    the temporary container
# docker create --name=rdkit-minimallib-container rdkit-minimallib:latest --entrypoint /
# docker cp rdkit-minimallib-container:/RDKit_minimal.js ../demo
# docker cp rdkit-minimallib-container:/RDKit_minimal.wasm ../demo
# docker rm rdkit-minimallib-container


ARG RDKIT_GIT_URL="https://github.com/rdkit/rdkit.git"
ARG RDKIT_BRANCH="master"
ARG EMSDK_VERSION="latest"
ARG EXCEPTION_HANDLING="-fexceptions -sNO_DISABLE_EXCEPTION_CATCHING"
ARG BOOST_MAJOR_VERSION="1"
ARG BOOST_MINOR_VERSION="87"
ARG BOOST_PATCH_VERSION="0"
ARG FREETYPE_VERSION="2.13.3"

FROM debian:bookworm as build-stage
ARG RDKIT_GIT_URL
ARG RDKIT_BRANCH
ARG EMSDK_VERSION
ARG EXCEPTION_HANDLING
ARG BOOST_MAJOR_VERSION
ARG BOOST_MINOR_VERSION
ARG BOOST_PATCH_VERSION
ARG FREETYPE_VERSION

LABEL maintainer="Greg Landrum <greg.landrum@t5informatics.com>"

RUN apt-get update && apt-get upgrade -y && apt install -y \
  curl \
  wget \
  cmake \
  python3 \
  g++ \
  libeigen3-dev \
  git \
  xz-utils \
  nodejs

ENV LANG C

WORKDIR /src
ARG BOOST_DOT_VERSION="${BOOST_MAJOR_VERSION}.${BOOST_MINOR_VERSION}.${BOOST_PATCH_VERSION}"
ARG BOOST_UNDERSCORE_VERSION="${BOOST_MAJOR_VERSION}_${BOOST_MINOR_VERSION}_${BOOST_PATCH_VERSION}"
RUN wget -q https://archives.boost.io/release/${BOOST_DOT_VERSION}/source/boost_${BOOST_UNDERSCORE_VERSION}.tar.gz && \
  tar xzf boost_${BOOST_UNDERSCORE_VERSION}.tar.gz
WORKDIR /src/boost_${BOOST_UNDERSCORE_VERSION}
RUN ./bootstrap.sh --prefix=/opt/boost --with-libraries=system && \
  ./b2 install

WORKDIR /opt
RUN git clone https://github.com/emscripten-core/emsdk.git

WORKDIR /opt/emsdk
RUN ./emsdk install ${EMSDK_VERSION} && \
  ./emsdk activate ${EMSDK_VERSION}

#RUN source ./emsdk_env.sh

RUN echo "source /opt/emsdk/emsdk_env.sh > /dev/null 2>&1" >> ~/.bashrc
SHELL ["/bin/bash", "-c", "-l"]

WORKDIR /src
RUN wget -q https://download.savannah.gnu.org/releases/freetype/freetype-${FREETYPE_VERSION}.tar.gz && \
  tar xzf freetype-${FREETYPE_VERSION}.tar.gz
WORKDIR /src/freetype-${FREETYPE_VERSION}
RUN mkdir build
WORKDIR /src/freetype-${FREETYPE_VERSION}/build
RUN emcmake cmake -DCMAKE_BUILD_TYPE=Release -DWITH_ZLIB=OFF -DWITH_BZip2=OFF -DWITH_PNG=OFF \
  -DCMAKE_C_FLAGS="${EXCEPTION_HANDLING}" -DCMAKE_EXE_LINKER_FLAGS="${EXCEPTION_HANDLING}" \
  -DCMAKE_INSTALL_PREFIX=/opt/freetype ..
RUN make -j2 && make -j2 install

WORKDIR /src
ENV RDBASE=/src/rdkit
RUN git clone ${RDKIT_GIT_URL}
WORKDIR $RDBASE
RUN git fetch --all --tags && \
  git checkout ${RDKIT_BRANCH}
RUN mkdir build
WORKDIR $RDBASE/build
RUN emcmake cmake -DRDK_BUILD_FREETYPE_SUPPORT=ON -DRDK_BUILD_MINIMAL_LIB=ON \
  -DRDK_BUILD_PYTHON_WRAPPERS=OFF -DRDK_BUILD_CPP_TESTS=OFF -DRDK_BUILD_INCHI_SUPPORT=ON \
  -DRDK_USE_BOOST_SERIALIZATION=OFF -DRDK_OPTIMIZE_POPCNT=OFF -DRDK_BUILD_THREADSAFE_SSS=OFF \
  -DRDK_BUILD_DESCRIPTORS3D=OFF -DRDK_TEST_MULTITHREADED=OFF \
  -DRDK_BUILD_MAEPARSER_SUPPORT=OFF -DRDK_BUILD_COORDGEN_SUPPORT=ON \
  -DBoost_DIR=/opt/boost/lib/cmake/Boost-${BOOST_DOT_VERSION} \
  -Dboost_headers_DIR=/opt/boost/lib/cmake/boost_headers-${BOOST_DOT_VERSION} \
  -DRDK_BUILD_SLN_SUPPORT=OFF -DRDK_USE_BOOST_IOSTREAMS=OFF \
  -DFREETYPE_INCLUDE_DIRS=/opt/freetype/include/freetype2 \
  -DFREETYPE_LIBRARY=/opt/freetype/lib/libfreetype.a \
  -DCMAKE_CXX_FLAGS="${EXCEPTION_HANDLING} -O3 -DNDEBUG" \
  -DCMAKE_C_FLAGS="${EXCEPTION_HANDLING} -O3 -DNDEBUG -DCOMPILE_ANSI_ONLY" \
  -DCMAKE_EXE_LINKER_FLAGS="${EXCEPTION_HANDLING} -s STACK_OVERFLOW_CHECK=1 -s USE_PTHREADS=0 -s ALLOW_MEMORY_GROWTH=1 -s MAXIMUM_MEMORY=4GB -s MODULARIZE=1 -s EXPORT_NAME=\"'initRDKitModule'\"" ..

# "patch" to make the InChI code work with emscripten:
RUN cp /src/rdkit/External/INCHI-API/src/INCHI_BASE/src/util.c /src/rdkit/External/INCHI-API/src/INCHI_BASE/src/util.c.bak && \
  sed 's/&& defined(__APPLE__)//' /src/rdkit/External/INCHI-API/src/INCHI_BASE/src/util.c.bak > /src/rdkit/External/INCHI-API/src/INCHI_BASE/src/util.c

# comment out a line which causes a compilation error on some platforms
# (based on the change which has already been applied to the RapidJSON master branch, see
# https://github.com/Tencent/rapidjson/blob/ab1842a2dae061284c0a62dca1cc6d5e7e37e346/include/rapidjson/document.h#L414)
RUN sed -i 's|^\( *\)\(GenericStringRef\& operator=(const GenericStringRef\& rhs) { s = rhs.s; length = rhs.length; } *\)$|\1//\2|' \
  /src/rdkit/External/rapidjson-1.1.0/include/rapidjson/document.h

# build and "install"
RUN make -j2 RDKit_minimal && \
  cp Code/MinimalLib/RDKit_minimal.* ../Code/MinimalLib/demo/

# run the tests
WORKDIR /src/rdkit/Code/MinimalLib/tests
RUN /opt/emsdk/node/*/bin/node tests.js

# Copy js and wasm rdkit files to use in browser
# This feature requires the BuildKit backend
# https://docs.docker.com/engine/reference/commandline/build/#custom-build-outputs
FROM scratch as export-stage
COPY --from=build-stage /src/rdkit/Code/MinimalLib/demo /
COPY --from=build-stage /src/rdkit/Code/MinimalLib/docs /