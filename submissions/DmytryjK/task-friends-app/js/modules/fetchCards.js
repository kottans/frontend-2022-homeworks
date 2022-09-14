const preloader = document.querySelector('.preloader');

const getPeopleInfo = async (url) => {
    try {
        preloader.classList.add('preloader_active');
        const res = await fetch(url);

        await preloader.classList.remove('preloader_active');
        return await res.json();
    } catch (error) {
        return await getPeopleInfo(url);
    }
};

export {getPeopleInfo};
