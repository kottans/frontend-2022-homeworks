let getPeopleInfo = async (url) => {
    const res = await fetch(url);
    return await res.json();
}

export {getPeopleInfo};
