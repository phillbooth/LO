#!/usr/bin/env bash

set -e

LO_DIR="packages/lo-core"
LO_REPO="https://github.com/phillbooth/LO.git"

if [ -d "$LO_DIR/.git" ]; then
  echo "LO is already installed at $LO_DIR"
  echo "No changes made."
  exit 0
fi

if [ -d "$LO_DIR" ] && [ "$(ls -A "$LO_DIR")" ]; then
  echo "Error: $LO_DIR already exists and is not empty."
  echo "No changes made."
  exit 1
fi

echo "Installing LO into $LO_DIR..."
git submodule add "$LO_REPO" "$LO_DIR"

echo "LO installed."
echo "Commit the change with:"
echo "git add .gitmodules $LO_DIR"
echo "git commit -m \"Add LO submodule\""
