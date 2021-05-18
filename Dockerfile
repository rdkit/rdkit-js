FROM debian:buster as build-stage
LABEL maintainer="Greg Landrum <greg.landrum@t5informatics.com>"

RUN apt-get update && apt-get upgrade -y && apt install -y \
  curl \
  wget \
  cmake \
  python3 \
  g++ \
  libeigen3-dev \
  git \
  nodejs

ENV LANG C

WORKDIR /opt
RUN wget -q https://boostorg.jfrog.io/artifactory/main/release/1.67.0/source/boost_1_67_0.tar.gz && \
  tar xzf boost_1_67_0.tar.gz 
WORKDIR /opt/boost_1_67_0
RUN ./bootstrap.sh --prefix=/opt/boost --with-libraries=system && \
  ./b2 install


WORKDIR /opt
RUN git clone https://github.com/emscripten-core/emsdk.git

WORKDIR /opt/emsdk
RUN ./emsdk update-tags && \
  ./emsdk install latest && \
  ./emsdk activate latest

#RUN source ./emsdk_env.sh

RUN mkdir -p /src
WORKDIR /src
ENV RDBASE=/src/rdkit
ARG RDKIT_BRANCH=${RDKIT_BRANCH:-master}
RUN git clone https://github.com/rdkit/rdkit.git
WORKDIR $RDBASE
RUN git fetch --all --tags && \
  git checkout $RDKIT_BRANCH && \
  mkdir -p build

WORKDIR build

RUN echo "source /opt/emsdk/emsdk_env.sh" >> ~/.bashrc
SHELL ["/bin/bash", "-c", "-l"]
RUN emcmake cmake -DBoost_INCLUDE_DIR=/opt/boost/include -DRDK_BUILD_FREETYPE_SUPPORT=ON -DRDK_BUILD_MINIMAL_LIB=ON \
  -DRDK_BUILD_PYTHON_WRAPPERS=OFF -DRDK_BUILD_CPP_TESTS=OFF -DRDK_BUILD_INCHI_SUPPORT=ON \
  -DRDK_USE_BOOST_SERIALIZATION=OFF -DRDK_OPTIMIZE_POPCNT=OFF -DRDK_BUILD_THREADSAFE_SSS=OFF \
  -DRDK_BUILD_DESCRIPTORS3D=OFF -DRDK_TEST_MULTITHREADED=OFF \
  -DRDK_BUILD_MAEPARSER_SUPPORT=OFF -DRDK_BUILD_COORDGEN_SUPPORT=ON \
  -DRDK_BUILD_SLN_SUPPORT=OFF -DRDK_USE_BOOST_IOSTREAMS=OFF \
  -DCMAKE_CXX_FLAGS="-s DISABLE_EXCEPTION_CATCHING=0 -s MODULARIZE=1 -s EXPORT_NAME=\"'initRDKitModule'\"" \
  -DCMAKE_C_FLAGS="-DCOMPILE_ANSI_ONLY -s MODULARIZE=1 -s EXPORT_NAME=\"'initRDKitModule'\"" \
  -D CMAKE_EXE_LINKER_FLAGS="-s MODULARIZE=1 -s EXPORT_NAME=\"'initRDKitModule'\"" ..

# "patch" to make the InChI code work with emscripten:
RUN cp /src/rdkit/External/INCHI-API/src/INCHI_BASE/src/util.c /src/rdkit/External/INCHI-API/src/INCHI_BASE/src/util.c.bak && \
  sed 's/&& defined(__APPLE__)//' /src/rdkit/External/INCHI-API/src/INCHI_BASE/src/util.c.bak > /src/rdkit/External/INCHI-API/src/INCHI_BASE/src/util.c

# build and "install"
RUN make -j2 RDKit_minimal && \
  mkdir -p ../Code/MinimalLib/dist && \
  cp Code/MinimalLib/RDKit_minimal.* ../Code/MinimalLib/dist/

# run the tests
WORKDIR /src/rdkit/Code/MinimalLib/tests
RUN nodejs tests.js

# Copy js and wasm rdkit files to use in browser
# This feature requires the BuildKit backend
# https://docs.docker.com/engine/reference/commandline/build/#custom-build-outputs
FROM scratch as export-stage
COPY --from=build-stage /src/rdkit/Code/MinimalLib/dist /
COPY docs /