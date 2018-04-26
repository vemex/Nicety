#!/bin/bash
set -ev 
if [ "$TRAVIS_TAGa" != "" ]; then
tar czvf nicety.tar.gz ./target/www/
fi