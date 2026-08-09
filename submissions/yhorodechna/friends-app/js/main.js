const PRELOADER_EL = document.querySelector('#preloader');
const DEFAULT_SETTINGS = {
    userName: '',
    nationalityList: [
        ENationality.UA,
        ENationality.US,
        ENationality.DK,
        ENationality.FR,
        ENationality.GB
    ],
    gender: EGenderFilter.all,
    sort: ESort.unsorted,
}

function filterBySettings({ friends, settings }) {
    let res = friends;
    if (settings.userName) {
        const friendNameInLowerCase = settings.userName.toLowerCase();
        res = res.filter(friend => friend.name.toLowerCase().indexOf(friendNameInLowerCase) >= 0)
    }
    res = res.filter(friend => settings.nationalityList.includes(friend.nat))
    if (settings.gender !== EGenderFilter.all) {
        res = res.filter(friend => settings.gender === friend.gender)
    }
    if (settings.sort !== ESort.unsorted) {
        if (settings.sort === ESort.ageAZ || settings.sort === ESort.ageZA) {
            const direction = (settings.sort === ESort.ageZA ? -1 : 1)
            res = res.sort((friendA, friendB) => {
                return (friendA.age - friendB.age) * direction
            })
        }
        else if (settings.sort === ESort.nameAZ || settings.sort === ESort.nameZA) {
            const direction = (settings.sort === ESort.nameZA ? -1 : 1)
            res = res.sort((friendA, friendB) => {
                return friendA.name.localeCompare(friendB.name) * direction
            })
        }
    }
    if (!res.length) {
        MAIN_CONTENT_EL.classList.add('no-results')
    } else {
        MAIN_CONTENT_EL.classList.remove('no-results')
    }
    return res;
}

let FRIENDS = [];
function onSettingsOrPagingChange({ settings, page }) {
    if (settings) {
        setPage(1);
    }
    const filteredFriends = filterBySettings({ friends: FRIENDS, settings: CURRENT_SETTINGS })
    const pagedFriends = filterByPagination({ items: filteredFriends, main: MAIN_CONTENT_EL, itemsPerPage: ITEMS_ON_PAGE, page: CURRENT_PAGE })
    renderFriends({ friends: pagedFriends })
    renderPagination({ total: filteredFriends.length, itemsPerPage: ITEMS_ON_PAGE });
    document.getElementById('main').scrollTop = 0;
}

initPagination({ onPageChange: onSettingsOrPagingChange });

initFriendsAsync({
    onFriendsLoaded: ({ friends }) => {
        FRIENDS = friends;
        if (FRIENDS) {
            PRELOADER_EL.classList.add('preloader-hide');
            setTimeout(() => { PRELOADER_EL.classList.add('preloader-remove') }, 1000)
        }
        initSettings({
            settings: DEFAULT_SETTINGS,
            onSettingsChange: ({ settings }) => onSettingsOrPagingChange({ settings })
        });
    }
});

