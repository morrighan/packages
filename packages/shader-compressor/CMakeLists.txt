cmake_minimum_required(VERSION 4.1.2)
project(@cichol/shader-compressor)

find_program(CCACHE_PROGRAM ccache)
if(CCACHE_PROGRAM)
    set(CMAKE_C_COMPILER_LAUNCHER "${CCACHE_PROGRAM}")
    set(CMAKE_CXX_COMPILER_LAUNCHER "${CCACHE_PROGRAM}")
endif()

set(GLSLOPT_SRC artifacts/glsl-optimizer/src)
file(GLOB_RECURSE glslopt_files
    ${GLSLOPT_SRC}/*.c
    ${GLSLOPT_SRC}/*.cpp)
file(GLOB glslopt_ignores
    ${GLSLOPT_SRC}/getopt/*.c
    ${GLSLOPT_SRC}/glsl/main.cpp
    ${GLSLOPT_SRC}/node/*.cpp)
list(REMOVE_ITEM glslopt_files ${glslopt_ignores})

add_library(glslopt)
target_include_directories(glslopt PRIVATE
    ${GLSLOPT_SRC}/../include
    ${GLSLOPT_SRC}/mesa
    ${GLSLOPT_SRC}/glsl
    ${GLSLOPT_SRC})
target_sources(glslopt PRIVATE ${glslopt_files})
target_compile_features(glslopt PRIVATE cxx_std_14)
target_compile_options(glslopt PRIVATE
    -O3
    -flto
    -fno-strict-aliasing
    -msimd128
    -Wno-deprecated-register
    -sSTRICT=1)

add_executable(optimizer)
target_include_directories(optimizer PRIVATE .)
target_sources(optimizer PRIVATE sources/optimizer.cpp)
target_compile_features(optimizer PRIVATE cxx_std_23)
target_compile_options(optimizer PRIVATE
    -O3
    -flto
    -fno-strict-aliasing
    -msimd128
    -sSTRICT=1)
target_link_options(optimizer PRIVATE
    -O3
    -flto
    -lembind
    -sSTRICT=1
    -sALLOW_MEMORY_GROWTH=1
    -sFILESYSTEM=0
    -sMODULARIZE=1
    -sEXPORT_ES6=1
    -sENVIRONMENT=node
    --no-entry
    --closure=1
    --closure-args="--compilation_level=ADVANCED"
    --closure-args="--formatting=PRETTY_PRINT"
    --emit-tsd=optimizer.d.ts)
target_link_libraries(optimizer glslopt)
