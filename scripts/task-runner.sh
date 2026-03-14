#!/usr/bin/env bash

trap 'trap - EXIT && __runall default' EXIT

__darwin() { test "$(uname -s)" = "Darwin"; }
__exists() { test "$(command -v "$1")"; }
__invoke() { __exists "$1" && "$1"; }

__runall() {
	local TARGET

	for TARGET in "$@"; do
		__invoke "task_$TARGET";
	done
}

__describe() {
	if [ "${GITHUB_ACTIONS:-}" == true ] && [ ! -z "$1" ]; then
		echo "::group::$1"
		trap 'trap "echo \"::endgroup::\" && trap - RETURN" RETURN' RETURN
	fi
}
