cmake_minimum_required(VERSION 4.1.2)
project(@cichol/shader-compressor)

find_program(CCACHE_PROGRAM ccache)
if(CCACHE_PROGRAM)
    set(CMAKE_C_COMPILER_LAUNCHER "${CCACHE_PROGRAM}")
    set(CMAKE_CXX_COMPILER_LAUNCHER "${CCACHE_PROGRAM}")
endif()

set(GLSLOPT_SRC externals/glsl-optimizer/src)
file(GLOB_RECURSE glslopt_files
    ${GLSLOPT_SRC}/*.c
    ${GLSLOPT_SRC}/*.cpp)
file(GLOB glslopt_ignores
    ${GLSLOPT_SRC}/getopt/*.c
    ${GLSLOPT_SRC}/glsl/main.cpp
    ${GLSLOPT_SRC}/node/*.cpp)
list(REMOVE_ITEM glslopt_files ${glslopt_ignores})

add_library(glslopt OBJECT)
target_include_directories(glslopt PRIVATE
    ${GLSLOPT_SRC}/../include
    ${GLSLOPT_SRC}/mesa
    ${GLSLOPT_SRC}/glsl
    ${GLSLOPT_SRC})
target_sources(glslopt PRIVATE ${glslopt_files})
target_compile_features(glslopt PRIVATE cxx_std_14)
target_compile_options(glslopt PRIVATE
    -O3
    -fwasm-exceptions
    -fno-strict-aliasing
    -msimd128
    -Wno-deprecated-register
    -Wno-return-type)

add_library(bindings STATIC)
target_include_directories(bindings PRIVATE .)
target_sources(bindings PRIVATE
    $<TARGET_OBJECTS:glslopt>
    sources/bindings.cpp)
target_compile_features(bindings PRIVATE cxx_std_23)
target_compile_options(bindings PRIVATE
    -O3
    -fwasm-exceptions
    -msimd128)
set_target_properties(bindings PROPERTIES PREFIX "")
