2025/08/31
はじめてcurlコマンドを使用したが



2025/08/27
シンプルにmainブランチを使ってずっと開発するよりかは、
個人開発でもブランチ分けた方が良くね？

メモは、Qiitaに書いて
githubは、個人でもブランチ分けて開発して差分がわかるようにするのが良さげ←運用は記事見てどうするか確認いるけど

以下 ブランチで開発手順

git fetch origin

git checkout -b 作りたいブランチ名 origin/main git checkout -b test origin/main

git push -u origin 作りたいブランチ名 git push -u origin test

ちなみにvscodeのpeacockとかい色付け拡張機能まさかのブランチごとにも設定できるっぽい優れもので笑う


