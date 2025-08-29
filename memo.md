<!-- supabaseのauth helpersをインストール -->
npm install @supabase/auth-helpers-nextjs


<!-- shad cni -->
npx shadcn-ui@latest init　👈これ古いらしい
npx shadcn@latest init　👈こっちが新しいの
<!-- button -->
npx shadcn-ui@alatest add button
<!-- card -->
npx shadcn@latest add card


<!-- supabase CLI -->
npx supabase login
<!-- supabaseのテーブルの型をCLIで作成する方法 -->
npx supabase gen types typescript --project-id rlgpmesweduwovoyoieu
<!-- リダイレクトでファイルに生成した型を保存する方法 -->
npx supabase gen types typescript --project-id rlgpmesweduwovoyoieu > lib/database.types.ts



<!-- supabaseが管理しているユーザーの情報  -->
SELECT * FROM auth.users

<!-- gitの履歴を完全消去するやつ？ -->
git-filter-repo

<!-- stripeのモジュールをダウンロード -->
npm i stripe

<!-- ランダムな文字列を生成する方法 -->
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

<!-- localhost:3000を一時的に外部へ公開する便利なサービス"ngrok"をインストール -->
npm i -g ngrok

<!-- そのngrokを使う方法 -->
<!-- まずは、アクセストークンを追加 -->
ngrok config add-authtoken
ngrok http 3000

<!-- vercelのCLI -->
npm i -g vercel

<!-- youtubeなどのサードパーティ系をいい感じで扱えるようにするやつ -->
<!-- バージョン周り合わせるため公式ではないやつ使用 -->
npm i @next/third-parties@14

<!-- ストライプのリダイレクトさせるモジュールをインストール -->
npm i @stripe/stripe-js
