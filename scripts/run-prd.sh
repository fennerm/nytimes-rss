#!/usr/bin/env bash
set -xeuo pipefail

VE_PYTHON="./ve/bin/python"

memcached &
npm run build
"$VE_PYTHON" manage.py collectstatic --no-input
DEBUG=false "$VE_PYTHON" manage.py runserver

trap 'trap - SIGTERM && kill -- -$$' SIGINT SIGTERM EXIT