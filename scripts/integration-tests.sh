#!/bin/sh

# Run all .hurl files under tests/integration.
# Make sure hurl is installed, see https://hurl.dev
hurl --test --file-root "tests/integration/fixtures" --glob "tests/integration/**/*.hurl"
