#!/bin/bash

set -e
set -u

echo "Resettings database"
dropdb -U ${POSTGRES_USER} ${POSTGRES_DB}
createdb -U ${POSTGRES_USER} ${POSTGRES_DB} 2> /dev/null || echo "database already exists"
dropdb -U ${POSTGRES_USER} journals
createdb -U ${POSTGRES_USER} journals 2> /dev/null || echo "database already exists"
