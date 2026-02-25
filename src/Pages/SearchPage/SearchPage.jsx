import SearchInput from "../../Components/SearchInput/SearchInput";
import Header from "../../Components/Header/Header";
import { useLocation } from "react-router-dom";
import "./StyleSearchPage.css"

const videos = [
  {
    id: 1,
    title: "Building a React Clone",
    src: "react-clone.wav",
    thumbnail: "react-thumb.jpg",
    description: "I recreated YouTube’s homepage using React.",
    creator: "CodeWithAndrew",
    views: "842K",
    released: "3 days ago"
  },
  {
    id: 2,
    title: "Late Night Lo-Fi Mix",
    src: "lofi-night.wav",
    thumbnail: "lofi-thumb.jpg",
    description: "Chill beats to code to.",
    creator: "Midnight Beats",
    views: "1.2M",
    released: "1 week ago"
  },
  {
    id: 3,
    title: "How Flexbox Actually Works",
    src: "flexbox-guide.wav",
    thumbnail: "flexbox-thumb.jpg",
    description: "Flexbox explained clearly.",
    creator: "Frontend Simplified",
    views: "356K",
    released: "2 weeks ago"
  }
];

function search(query) {
  if (!query) return [];
  return videos.filter((video) =>
    video.title.toLowerCase().includes(query.toLowerCase()),
  );
}

function getSearchResultsContent() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  let content;

  if (query.trim() === "") {
    content = <p>No videos found.</p>;
  } else {
    const result = search(query);
    if (result.length === 0) {
      content = <p>No videos found.</p>;
    } else {
        content = result.map((video) => (
        <div key={video.id} className="video">

            <img
            src={video.thumbnail}
            alt={video.title}
            className="thumbnail"
            />

            <div className="video-text">
            <h3>{video.title}</h3>
            <p className="creator">{video.creator}</p>
            <p className="meta">
                {video.views} views • {video.released}
            </p>
            </div>
        </div>
        ));
    }
  }

  return content;
}

export default function SearchPage() {
  const content = getSearchResultsContent();

  return (
    <>
      <Header />
      <SearchInput classname={"Search"}/>
      <div id="video-grid">{content}</div>
    </>
  );
}
