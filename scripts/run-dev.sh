#!/usr/bin/env bash
set -xeuo pipefail

npm run dev &
memcached &
DEBUG=true ./ve/bin/python manage.py runserver

trap 'trap - SIGTERM && kill -- -$$' SIGINT SIGTERM EXIT