#!/bin/bash
#set -ev
npm install

if [ "$TRAVIS_TAG" != "" ]; then
  echo $TRAVIS_TAG
else
    echo test
fi 