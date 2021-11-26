#!/bin/sh
set -eu

if [ -z "${API_TOKEN:-}" ]; then
    echo 'Error: Missing API_TOKEN env variable.'
    exit 1
fi

echo "Patching bundle:"
cd /usr/share/nginx/html/
echo "  - API_TOKEN"
sed -i "s/PLEASE_SET_API_TOKEN_VARIABLE/$API_TOKEN/g" bundle.js

echo "Patching done."
