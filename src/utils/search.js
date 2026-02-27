const invidiousUrl = "http://100.100.22.66:3000";

export async function search(query, page) {
    const fetchPage = async (q, p) => {
        const url = new URL(`${invidiousUrl}/api/v1/search`);
        url.search = new URLSearchParams({ q, page: p }).toString();
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    };

    const data = await fetchPage(query, page);
    if (!data || data.length === 0) return [];
    return data.filter(item => item.type === "video");
}
