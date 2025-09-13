// 👇 ページを動的化（SSG中に cookies() が呼ばれて落ちるのを防ぐ）
export const dynamic = 'force-dynamic';
import React from "react" 
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { YouTubeEmbed } from "@next/third-parties/google"; 
import { extractYouTubeVideoId } from "@/utils/extractYoutubeVideoId";
import { Database } from "@/lib/database.types";
import { supabaseServer } from "@/utils/supabaseServer";


const getDetailLesson = async ( id: number, supabase: SupabaseClient<Database>) => {
    const {data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", id)
    .single();
    return lesson;
};

const getPremiumContent = async ( id: number, supabase: SupabaseClient<Database>) => {
    const {data: video } = await supabase
    .from("premium_content")
    .select("video_url")
    .eq("lesson_id",id)
    .single();
    return video;
};


const LessonDetailPage = async ({params}: {params: {id: number}}) =>  {
    const supabase = supabaseServer();
    // 非同期処理を並列でやる書き方
    const [lesson, video] = await Promise.all([
         getDetailLesson(params.id, supabase),
         getPremiumContent(params.id,supabase),
    ])

    const url = video?.video_url ?? null;
    const videoId  = url ? (extractYouTubeVideoId(url) ?? ""): "";
    // console.log(videoId);
    console.log({ url: video?.video_url, videoId });

    
    return (
        <div className="w-full max-w-3xl mx-auto py-16 px-8">
            <h1 className="text-3xl mb-6">{lesson?.title}</h1>
            <p className="mb-8">{lesson?.description}</p>
            <YouTubeEmbed height={400} videoid={videoId} />
        </div>
        );    
}
export default LessonDetailPage;
