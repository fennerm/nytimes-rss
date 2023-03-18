SHELL=/usr/bin/env bash

run_dev:
	./scripts/run-dev.sh

run_prd:
	./scripts/run-prd.sh

install:
	./scripts/install.sh

test:
	pytest
