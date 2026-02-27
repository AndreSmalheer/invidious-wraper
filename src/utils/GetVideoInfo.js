export async function getVideoInfo(videoId) {
    if (!videoId) return null;

    try {
        const url = `http://100.100.22.66:3000/api/v1/videos/${videoId}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching video:", err);
        return null;
    }
}
