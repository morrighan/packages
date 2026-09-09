#!/usr/bin/env bash

function bootstrap() {
	unset -f bootstrap
	set -euxo pipefail

	yarn install --immutable
	yarn workspaces list
	yarn build
	yarn test
}

bootstrap "$@"
