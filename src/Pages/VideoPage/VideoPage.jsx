import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getVideoInfo } from "../../utils/GetVideoInfo";
import Header from "../../Components/Header/Header";

export default function VideoPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const video_id = params.get("video_id") || null;

  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideo() {
      setLoading(true);
      const data = await getVideoInfo(video_id);
      setVideoData(data);
      setLoading(false);
    }

    fetchVideo();
  }, [video_id]);

  if (loading) return <p>Loading...</p>;
  if (!videoData) return <p>Video not found</p>;

  console.log(videoData);

  return (
    <>
    <Header />
    <div id="video-page">
      <div id="video-info" className="video-info">
        <h1 id="video-title" className="video-title">
          {videoData.title}
        </h1>

        <div id="author-info" className="author-info">
          <img
            id="author-thumbnail"
            className="author-thumbnail"
            src={videoData.authorThumbnails[0].url}
            alt={`${videoData.author} thumbnail`}
          />
          <h2 id="author-name" className="author-name">
            {videoData.author}
          </h2>
          <h3 id="author-id" className="author-id">
            Author ID: {videoData.authorId}
          </h3>
        </div>

        <div id="video-meta" className="video-meta">
          <h3 id="video-views" className="video-views">
            Views: {videoData.viewCount}
          </h3>
          <h3 id="video-published" className="video-published">
            Published: {videoData.publishedText}
          </h3>
        </div>
      </div>

      <div id="recommended-videos" className="recommended-videos">
        {videoData.recommendedVideos?.length > 0 ? (
          videoData.recommendedVideos.map((video) => (
            <div
              key={video.videoId}
              id={`recommended-${video.videoId}`}
              className="recommended-video-card"
            >
              <p className="recommended-video-title">Title: {video.title}</p>
              <p className="recommended-video-id">ID: {video.videoId}</p>
            </div>
          ))
        ) : (
          <p id="no-recommended" className="no-recommended">
            No recommended videos
          </p>
        )}
      </div>

      {videoData.formatStreams?.length > 0 && (
        <video
          id="main-video"
          className="main-video-player"
          src={videoData.formatStreams[0].url}
          controls
          autoPlay
        />
      )}
    </div>
    </>
  );
}
