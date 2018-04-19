#!/bin/bash
set -ev 

if [ "$TRAVIS_TAG" == "" ]; then
    echo 'ooo'
else
    echo 'test' 
fi