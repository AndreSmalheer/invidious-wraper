import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getVideoInfo } from "../../utils/GetVideoInfo";
import Header from "../../Components/Header/Header";
import "./VideoPage.css";

const invidous_url = "http://100.100.22.66:3000"

export default function VideoPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const video_id = params.get("video_id") || null;

  const navigate = useNavigate()

  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [likedText, setLikedText] = useState("");
  const [progress, setProgress] = useState(0);

  function formatNumber(num) {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
  }

  useEffect(() => {
    async function fetchVideo() {
      setLoading(true);
      const data = await getVideoInfo(video_id);
      setVideoData(data);
      setLoading(false);
    }
    fetchVideo();
  }, [video_id]);

  useEffect(() => {
    if (!videoData) return;

    setLikedText(formatNumber(videoData.likeCount));
  }, [videoData]);

  useEffect(() => {
    const video = document.getElementById("main-video");
    if (!video) return;

    if (playing) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  }, [playing, videoData]);

  useEffect(() => {
    const video = document.getElementById("main-video");
    if (!video) return;

    const updateProgress = () => {
        setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("timeupdate", updateProgress);

    return () => {
        video.removeEventListener("timeupdate", updateProgress);
    };
}, [videoData]);

  if (loading) return <p>Loading...</p>;
  if (!videoData) return <p>Video not found</p>;

  console.log(videoData);

  return (
    <>
      <Header />
      <div id="video-page">
        {/* Left: video + info glued together */}
        <div className="video-main-column">
          {videoData.formatStreams?.length > 0 && (
            <>
              <div className="video-container">
                <video
                  id="main-video"
                  className="main-video-player"
                  src={videoData.formatStreams[0].url}
                  onClick={() => setPlaying(!playing)}
                  autoPlay
                />

                <div className="controls">
                  <img
                    className="play-btn"
                    src={playing ? "/images/pause.png" : "/images/play.png"}
                    onClick={() => setPlaying(!playing)}
                  ></img>

                  <progress
                    className="video-progress"
                    value={progress}
                    max="100"
                    onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const video = document.getElementById("main-video");
                    if (video && video.duration) {
                        video.currentTime = (clickX / rect.width) * video.duration;
                    }
                    }}
                  />
                </div>
              </div>
            </>
          )}
          <div className="video-info">
            <h1 className="video-title">{videoData.title}</h1>

            <div className="author-container">
              <div className="author-info">
                <img
                  className="author-thumbnail"
                  src={videoData.authorThumbnails[0].url || "/images/default-author-thumbnail.svg"}
                  alt={`${videoData.author} thumbnail`}
                />
                <h2 className="author-name">{videoData.author}</h2>
                <h2 className="author-subCount">{videoData.subCountText}</h2>
              </div>

              <div className="like-dislike-container">
                <div className="like-container">
                  <img className="like-icon" src="/images/like.png"></img>
                  <span className="like-counter">{likedText}</span>
                </div>
                <div className="dislike-container">
                  <img className="dislike-icon" src="/images/dislike.png"></img>
                </div>
              </div>
            </div>
            <div className="video-meta">
              <h3 className="video-views">Views: {videoData.viewCount}</h3>
              <h3 className="video-published">
                Published: {videoData.publishedText}
              </h3>
            </div>
          </div>
        </div>

        {/* Right: sidebar */}
        <div className="recommended-videos">
          {videoData.recommendedVideos?.length > 0 ? (
            videoData.recommendedVideos.map((video) => (
                <div key={video.videoId} className="recommended-video-card" onClick={() => navigate(`/Video?video_id=${video.videoId}`)} >
                <img className="recommended-video-thumbnail" src={invidous_url + video.videoThumbnails[0].url}></img>
                <p className="recommended-video-title">{video.title}</p>
                {/* <p className="recommended-video-id">{video.videoId}</p> */}
              </div>
            ))
          ) : (
            <p className="no-recommended">No recommended videos</p>
          )}
        </div>
      </div>
    </>
  );
}
