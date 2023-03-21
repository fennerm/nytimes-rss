#!/usr/bin/env bash

set -xeuo pipefail

python3 -m venv ve
source ve/bin/activate
pip install -e '.[dev]'
npm install
