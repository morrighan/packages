#!/usr/bin/env bash

function bootstrap() {
	unset -f bootstrap
	set -euxo pipefail

	mkdir -p .cache/emsdk
	rsync -a packages/shader-compressor/artifacts/emsdk/upstream/emscripten/cache/ .cache/emsdk

	mkdir -p .cache/ccache
	rsync -a ~/.cache/ccache/ .cache/ccache
}

bootstrap "$@"
