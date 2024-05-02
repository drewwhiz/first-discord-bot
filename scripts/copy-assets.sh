#!/bin/sh

SCRIPT_BASEDIR=$(dirname "$0")
DIST_DIR="$SCRIPT_BASEDIR/../dist"

# Create dist directory
if [ ! -d $DIST_DIR ]; then
  mkdir $DIST_DIR
fi

# Create img directory
IMG_DST="$DIST_DIR/img"
if [ ! -d $IMG_DST ]; then
  mkdir $IMG_DST
fi

# Copy images
IMG_SRC="$SCRIPT_BASEDIR/../img"
for IMG_FILE in "$IMG_SRC"/*; do
    IMG_FILE_NAME=`basename $IMG_FILE`

    if [ ! -f "$IMG_DST/$IMG_FILE_NAME" ]; then
        cp "$IMG_FILE" "$IMG_DST"
    fi
done