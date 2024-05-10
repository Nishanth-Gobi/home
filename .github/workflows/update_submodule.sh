#!/bin/bash
git config --global user.email "nish.professional@gmail.com"
git config --global user.name "Nishanth-Gobi"

# git submodule add git@github.com:Nishanth-Gobi/Obsidian-Vault.git content
git submodule update --remote 
git add --all

if [[ $(git status --porcelain) ]]; then
    git commit -m "Update content"
    git push
else
    echo "No changes to commit and push."
fi