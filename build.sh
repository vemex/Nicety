#!/bin/bash
#set -ev

if [ "$TRAVIS_TAG" != "" ]; then
  echo $TRAVIS_TAG
else
    echo test
fi 