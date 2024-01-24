#!/bin/bash

set -e
set -u

echo "Creating test dbs"
createdb -U ${POSTGRES_USER} interview_test 2> /dev/null || echo "database already exists"
