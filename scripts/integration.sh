#!/usr/bin/env bash

function bootstrap() {
	unset -f bootstrap
	set -euxo pipefail

	yarn install --immutable
	yarn info --all --name-only
	yarn build
	yarn test
}

bootstrap "$@"
