import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchInput from "../../Components/SearchInput/SearchInput";
import Header from "../../Components/Header/Header";
import "./StyleSearchPage.css"

const invidiousUrl = "http://100.100.22.66:3000"

async function search(query) {
    const params = { q: query };
    const url = new URL("http://100.100.22.66:3000/api/v1/search");
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    let content;

    if (!data || data.length === 0) {
        content = <p>No videos found</p>
    } else {
        content = []

        for (const item of data){
            if(item.type == 'video'){
                const videoThumbnail = `${invidiousUrl}${item.videoThumbnails[0].url}`

                content.push(
                    <div key={item.videoId} id={item.videoId} className="video">
                        <img className="thumbnail" src={videoThumbnail}></img>

                        <div className="video-text">
                            <h3>{item.title}</h3>
                            <p className="creator">{item.author}</p>
                            <p className="meta">{item.viewCountText} {item.publishedText}</p>
                        </div>
                    </div>
                )
            }
        }
    }

    return(
        <>
        {content}
        </>
    )
}

function SkelotanGrid() {
    const placeholders = Array.from({ length: 24 });

    return (
        <>
            {placeholders.map((_, index) => (
                <div key={index} className="video skeleton-video">
                    <div className="thumbnail skeleton-box"></div>

                    <div className="video-text">
                        <h3 className="skeleton-line"></h3>
                        <p className="skeleton-line creator"></p>
                        <p className="skeleton-line meta"></p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default function SearchPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";

    const [content, setContent] = useState();

    useEffect(() => {
        async function fetchResults() {
            setContent(<SkelotanGrid />)

            const result = await search(query);
            setContent(result);
        }
        fetchResults();
    }, [query]);

    return (
        <>
            <Header />
            <SearchInput classname="Search centered" searchText={query} />
            <div id="video-grid">{content}</div>
        </>
    );
}
