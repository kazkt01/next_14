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
npx supabase gen types typescript --project-id rlgpmesweduwovoyoieu > src/lib/database.types.ts

<!-- supabaseが管理しているユーザーの情報  -->
SELECT * FROM auth.users

<!-- gitの履歴を完全消去するやつ？ -->
git-filter-repo



