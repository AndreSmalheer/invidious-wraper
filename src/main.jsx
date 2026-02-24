import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

const videos = [
  { title: "video 1", src: "test0.wav" },
  { title: "video 2", src: "test.wav" },
];

function search(query) {
    let filteredVideos = []

    if (query != ""){
        filteredVideos = videos.filter(video =>
            video.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    return filteredVideos;
}

function App() {
    const [searchText, setSearchText] = useState("");
    const [enterPressed, setEnterPressed] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    let filteredVideos = [];
    if (enterPressed) {
        filteredVideos = search(searchQuery);
    }

    return (
        <>
        <input
            type="text"
            placeholder="Search videos..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    setSearchQuery(searchText);
                    setEnterPressed(true);
                }
            }}
        />

        {filteredVideos.length === 0 && enterPressed && (
            <p>No videos found.</p>
        )}

        {filteredVideos.map((video, index) => (
            <div key={index} className="video">
            <h2 className="video-title">{video.title}</h2>
            <p>{video.src}</p>
            </div>
        ))}
        </>
    );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
