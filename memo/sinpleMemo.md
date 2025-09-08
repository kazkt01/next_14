
2025/09/02
漸く、大枠はできた。
今回学んだこととして
１、Eslinterの存在
２、'use Client'やnodeランタイムなどの使い方
３、Next.jsのおおよその使い方。
４、APIの叩き方と実装方法
５、フロントとバックの効果的な使い方
６、大体のプログラム言語がやはりまずは、初期化してクラスというかメソッドを使い回す感じなのかと知る。
７、Supabaseの使い方とRLSの必要性やJsでのSQLの書き方、というかnodeでの書き方か

まぁ今回使用したものとしては
node.js, Next.js, Ts, Stripe, Supabase, graphQL, Postman, ngrok


2025/08/31
はじめてcurlコマンドを使用した、後で復讐しよう

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


