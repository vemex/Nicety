#!/bin/bash
#set -ev
npm install

if [ "$TRAVIS_TAG" != "" ]; then
    node release.js
    git config --local user.name "travis"  # 推送回gh-pages需要的基本配置
    git config --local user.email vivlanwong120729@gmail.com
    git add package.json
    git commit -m "[auto]Update version to $TRAVIS_TAG"
    git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" HEAD:master
    npm run build
    cd ../
    git clone  --depth 50 --branch gh-pages http://github.com/vemex/Nicety.git  nicety-pages
    cp -r Nicety/target/www/*  nicety-pages
    cd nicety-pages
    git add .
    git commit -m "[auto]Update version to $TRAVIS_TAG"
    git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" HEAD:gh-pages
    cd ../Nicety
else
    sonar-scanner
fi  