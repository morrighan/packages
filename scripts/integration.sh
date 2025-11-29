#!/usr/bin/env bash

function bootstrap() {
	unset -f bootstrap
	set -euxo pipefail

	npm config --global set fund=false
	npm config delete always-auth
	npm install --global npm
	npm ci --ignore-scripts
	npm ls --depth=0
	npm run build
	npm test
}

bootstrap "$@"
