#!/bin/bash
set -ev 
if [ "$TRAVIS_TAG" != "" ]; then
    tar czvf nicety.tar.gz ./target/dist/
fi