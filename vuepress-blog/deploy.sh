#!/user/bin/env sh

# 确保脚本抛出遇到的错误
set -e 

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 发布到自定义域名
echo 'https://yixinistab.xyz/' > CNAME

git init
git add -add
git commit -m 'deploy'

git push -f git@github.com:Captain-Tab/tallybook-demo1-build.git master:gh-pages

cd -