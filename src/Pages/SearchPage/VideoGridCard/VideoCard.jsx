import React from "react";
import { useNavigate } from "react-router-dom";
import "./VideoGridCard.css";

export default function VideoCard({ video }) {
    const navigate = useNavigate()
    const videoThumbnail = `http://100.100.22.66:3000${video.videoThumbnails[0].url}`;

    return (
        <div key={video.videoId} id={video.videoId} className="video" onClick={() => navigate(`/Video?video_id=${video.videoId}`)}>
            <img className="thumbnail" src={videoThumbnail} alt={video.title} />
            <div className="video-text">
                <h3>{video.title}</h3>
                <p className="creator">{video.author}</p>
                <p className="meta">{video.viewCountText} {video.publishedText}</p>
            </div>
        </div>
    );
}
