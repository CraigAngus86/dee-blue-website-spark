#!/bin/bash
# archive-legacy.sh
# This script moves all directories in the repository root that match the patterns
# *old*, *next*, or *backup* into an archive folder.

# Exit immediately if a command exits with a non-zero status.
set -e

# Create the archive directory if it doesn't already exist.
if [ ! -d "archive" ]; then
  echo "Creating archive directory..."
  mkdir archive
fi

echo "Searching for legacy directories to move..."

# Find directories in the current folder (maxdepth 1) with "old", "next", or "backup" in their name.
# Exclude the archive directory itself and the current directory.
legacy_dirs=$(find . -maxdepth 1 -type d \( -iname "*old*" -o -iname "*next*" -o -iname "*backup*" \) ! -iname "archive" ! -iname ".")

if [ -z "$legacy_dirs" ]; then
  echo "No legacy directories found."
else
  for dir in $legacy_dirs; do
    # Remove possible leading "./" by getting the basename.
    dir_clean=$(basename "$dir")
    echo "Moving directory: $dir_clean to archive/"
    mv "$dir_clean" archive/
  done
fi

echo "Legacy directories have been successfully moved to the archive folder."
