import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function VideoPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const video_id = params.get("video_id") || null;

    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideo() {
            if (!video_id) return;

            try {
                const url = `http://100.100.22.66:3000/api/v1/videos/${video_id}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setVideoData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchVideo();
    }, [video_id]);

    if (loading) return <p>Loading...</p>;
    if (!videoData) return <p>Video not found</p>;

    console.log(videoData);

    return (
        <div>
            <h1>{videoData.title}</h1>
            <video src={videoData.formatStreams[0].url} controls />
        </div>
    );
}
