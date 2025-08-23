import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import Link from "next/link";
// import { Database } from "@/lib/database.types";

const supabase = createServerComponentClient({cookies});

const getAllLessons = async () => {
  // これは、SSRかSSGかでいうとSSGになるとのこと
  // <Database>というジェネリクスという書き方で方を動的に指定できる？
  const {data: lessons } = await supabase.from("lesson").select("*");
  return lessons;
}


export default async function Home() {

  const lessons = await getAllLessons();

  return (
      <main className="w-full max-w-3xl mx-auto my-16 px-2">
        {/* ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}
        <div className="flex flex-col gap-4" >
          {lessons?.map((lesson) => (
            <Link href={`${lesson.id}`} key={lesson.id}>
          <Card>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
              {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            <CardContent>
              <p>{lesson.description}</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
         </Link>
          ))}
        </div>  
        {/* ーーーーーーーーーーーーーーーーーーーーーーーーーー */}
      </main>
  );
}
