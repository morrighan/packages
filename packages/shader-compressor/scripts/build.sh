#!/usr/bin/env bash

source "$(git rev-parse --show-toplevel)/scripts/task-runner.sh"

task_emsdk() {
	if ! __exists emsdk; then
		EMSDK_QUIET=1 source "externals/emsdk/emsdk_env.sh"
	fi
}

task_patch() {
	git -C externals/shader-minifier apply --check < patches/shader-minifier.patch 2> /dev/null && \
	git -C externals/shader-minifier apply < patches/shader-minifier.patch
}

task_cmake() {
	__describe "bindings.cpp => bindings.a"

	if [ ! -f "dists/build.ninja" ]; then
		emcmake cmake -S . -B dists -G Ninja -DCMAKE_BUILD_TYPE=Release
	fi

	cmake --build dists
}

task_dotnet() {
	__describe "bindings.a + minifier.fs => bindings.wasm"

	if __darwin; then
		dotnet() {
			docker run --rm -it --platform linux/amd64 -v ~/.nuget:/root/.nuget -v .:/sources dotnet:10.0 dotnet "$@"
		}
	fi

	dotnet publish -r browser-wasm -o dists
}

task_default() {
	__runall emsdk patch cmake dotnet
}
