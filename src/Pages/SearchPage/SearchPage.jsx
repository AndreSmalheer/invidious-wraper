import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { search } from "../../utils/search";
import SearchInput from "../../Components/SearchInput/SearchInput";
import Header from "../../Components/Header/Header";
import VideoCard from "./VideoGridCard/VideoCard";
import SkeletonGrid from "./SkeletonGrid/SkeletonGrid";
import "./StyleSearchPage.css";

export default function SearchPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    const page = Number(params.get("page") || 1);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResults() {
            setLoading(true);
            const result = await search(query, page);
            setVideos(result);
            setLoading(false);
        }
        fetchResults();
    }, [query, page]);

    return (
        <>
            <Header />
            <SearchInput classname="Search centered" searchText={query} />
            <div id="video-grid">
                {loading ? <SkeletonGrid /> : videos.map(video => <VideoCard key={video.videoId} video={video} />)}
            </div>
        </>
    );
}
