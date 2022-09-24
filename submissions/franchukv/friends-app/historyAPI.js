function transformToURL(filters) {
    const query = Object.entries(filters)
        .filter(([key, value]) => {
            return value.length > 0;
        })
        .map(([key, value]) => {
            return `${key}=${value}`;
        }).join('&');

    return `?${query}`;
}

async function syncURL(filters) {
    const query = transformToURL(filters);
    window.history.replaceState('url', '', `${query}`);
}

export default syncURL;
