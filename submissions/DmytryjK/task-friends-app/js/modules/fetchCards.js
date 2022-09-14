const preloader = document.querySelector('.preloader__content');

const getPeopleInfo = async (url) => {
    try {
        preloader.classList.add('preloader__content_active');
        const res = await fetch(url);

        await preloader.classList.remove('preloader__content_active');
        return await res.json();
    } catch (error) {
        return await getPeopleInfo(url);
    }
};

export {getPeopleInfo};
