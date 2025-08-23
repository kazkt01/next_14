import React from "react" 
import { cookies } from "next/headers"
import { createServerComponentClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { YouTubeEmbed } from "@next/third-parties/google"; 
import { extractYouTubeVideoId } from "@/utils/extractYoutubeVideoId";
import { Database } from "@/lib/database.types";


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
    .eq("id", id)
    .single();
    return video;
};


const LessonDetailPage = async ({params}: {params: {id: number}}) =>  {
    const supabase = createServerComponentClient<Database>({cookies});
    // 非同期処理を並列でやる書き方
    const [lesson, video] = await Promise.all([
         getDetailLesson(params.id, supabase),
         getPremiumContent(params.id,supabase),
    ])

    // 元のコード
    const videoId = extractYouTubeVideoId(video?.video_url) as string;
    console.log(videoId);

    // AIに回収させたコード
    // const videoId = video?.video_url
    // ? extractYouTubeVideoId(video.video_url)
    // : "";
    
    return (
        <div className="w-full max-w-3xl mx-auto py-16 px-8">
            <h1 className="text-3xl mb-6">{lesson?.title}</h1>
            <p className="mb-8">{lesson?.description}</p>
            <YouTubeEmbed height={400} videoid={videoId} />
        </div>
        );    
}
export default LessonDetailPage;
