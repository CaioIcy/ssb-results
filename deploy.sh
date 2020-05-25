#!/bin/bash

npm run build
sed -i 's/\/build/\#\/build/g' .gitignore
git add build/
git commit -m "deploy"
# git subtree push --prefix build origin gh-pages
git push origin `git subtree split --prefix build master`:gh-pages --force
sed -i 's/\#\/build/\/build/g' .gitignore
