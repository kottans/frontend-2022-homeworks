const pipe = (...arrayOfFunctions) => {
  if (arrayOfFunctions.length === 0) return null;
  else if (arrayOfFunctions.length === 1) return arrayOfFunctions[0]();
  return arrayOfFunctions.reduceRight(
    (recur, func) =>
      (...args) =>
        recur(func(...args))
  )();
};

const nodes = {
  paginationRadioButtons: null,
  containerForFriendsNode: null,
  radioNavContainer: null,
};

const constants = {
  MIN_AGE: 0,
  MAX_AGE: 200,
};

const state = {
  loading: false,
  allFriends: [],
  friendsFilter: {
    sortByAge: null,
    sortByName: null,
    ageFilterRange: { min: constants.MIN_AGE, max: constants.MAX_AGE },
    nameFilter: "",
    sexFilter: "all",
  },
};

const resetFilters = () => {
  state.friendsFilter.sortByAge = null;
  state.friendsFilter.sortByName = null;
  state.friendsFilter.ageFilterRange = {
    min: constants.MIN_AGE,
    max: constants.MAX_AGE,
  };
  state.friendsFilter.nameFilter = "";
  state.friendsFilter.sexFilter = "all";
};

const cardSize = {
  width: 200,
  height: 268,
};

const calcPagesAmount = (
  containerHeight,
  containerWidth,
  amountOfElements,
  gridGap = 10
) => {
  let columns = Math.trunc(containerWidth / cardSize.width) || 1;
  if (containerWidth % cardSize.width <= gridGap * (columns - 1)) columns--;
  let rows = Math.trunc(containerHeight / cardSize.height) || 1;
  if (containerHeight % cardSize.height <= gridGap * (rows - 1)) rows--;
  let amountPerPage = columns * rows;
  let amountOfPages = Math.ceil(amountOfElements / amountPerPage);
  return { amountPerPage, amountOfPages };
};

const getNearestNaturalNumbers = (
  currentNumber = 1,
  amountOfNumbersToReturnOdd = 1,
  totalNumbers = 1
) => {
  if (!(amountOfNumbersToReturnOdd % 2)) amountOfNumbers -= 1;
  const centralNumber = parseInt(currentNumber);
  let amountOfNumbers = parseInt(amountOfNumbersToReturnOdd);
  let numbersArr = [currentNumber];
  const ifShouldReturnFirstNumbers =
    centralNumber - ((amountOfNumbers - 1) / 2 + 1) <= 0;
  const ifShouldReturnLastNumbers =
    centralNumber + (amountOfNumbers - 1) / 2 + 1 > totalNumbers;
  if (
    isNaN(centralNumber) ||
    isNaN(amountOfNumbers) ||
    isNaN(parseInt(totalNumbers))
  ) {
    return undefined;
  }
  if (ifShouldReturnFirstNumbers) {
    numbersArr = [...new Array(amountOfNumbers)].map((_, i) => i + 1);
  } else if (ifShouldReturnLastNumbers) {
    numbersArr = [...new Array(totalNumbers)]
      .map((_, i) => i + 1)
      .filter((elem) => elem >= totalNumbers - amountOfNumbers + 1);
  } else {
    for (let i = Math.trunc((amountOfNumbers - 1) / 2); i >= 1; i--) {
      numbersArr.push(centralNumber - i);
      numbersArr.push(centralNumber + i);
    }
  }
  return numbersArr.sort((a, b) => a - b);
};

const createPagesNavigation = ({ totalPages, currentPage }) => {
  const updateVisibilityOfPaginationElements = (container) => {
    const visiblePaginationElements = chosePagesAndDotsToShow({
      navContainer: container,
      paginationSize: 9,
      currentPage,
    });
    container.querySelectorAll(".radio-nav-label").forEach((labelNode) => {
      if (
        visiblePaginationElements.paginationPageNumbers.includes(
          +labelNode.textContent
        )
      )
        labelNode.classList.remove("hidden-page-number");
    });
    container
      .querySelector(".radio-nav-label:first-of-type")
      .classList.remove("hidden-page-number");
    container
      .querySelector(".radio-nav-label:last-of-type")
      .classList.remove("hidden-page-number");
    if (visiblePaginationElements.visibleDots.left)
      container.querySelector(".left-dots").classList.remove("hidden");
    if (visiblePaginationElements.visibleDots.right)
      container.querySelector(".right-dots").classList.remove("hidden");
    return container;
  };

  const chosePagesAndDotsToShow = ({
    navContainer,
    paginationSize,
    currentPage,
  }) => {
    const totalRadioLabels =
      navContainer.querySelectorAll(".radio-nav-label").length;
    let visibleDots = { left: false, right: false };
    const paginationPageNumbers = getNearestNaturalNumbers(
      currentPage,
      paginationSize,
      totalRadioLabels
    );
    let onlyRightDotsNeeded = false;
    let onlyLeftDotsNeeded = false;
    if (totalRadioLabels < paginationSize + 2) {
      return { paginationPageNumbers, visibleDots };
    } else {
      onlyRightDotsNeeded = currentPage <= 6;
      onlyLeftDotsNeeded = currentPage >= totalRadioLabels - 5;
    }
    if (onlyRightDotsNeeded) {
      visibleDots.right = true;
    } else if (onlyLeftDotsNeeded) {
      visibleDots.left = true;
    } else if (totalRadioLabels > paginationSize + 2)
      visibleDots = { left: true, right: true };
    return { paginationPageNumbers, visibleDots };
  };

  const createContainer = () => {
    const radioContainerNode = document.createElement("div");
    radioContainerNode.classList.add("radio-nav-container");
    nodes.radioNavContainer = radioContainerNode;
    return radioContainerNode;
  };

  const addLabels = (container) => {
    container.append(
      ...[...new Array(totalPages)]
        .map((_) => document.createElement("label"))
        .map((labelNode, i) => {
          labelNode.setAttribute("for", `radio-${i + 1}`);
          labelNode.classList.add(`radio-nav-label`, "hidden-page-number");
          if (i + 1 === currentPage) labelNode.classList.add("checked");
          labelNode.innerText = i + 1;
          return labelNode;
        })
    );
    return container;
  };

  const addThreeDots = (container) => {
    const leftDots = document.createElement("span");
    const rightDots = document.createElement("span");
    leftDots.textContent = "...";
    leftDots.classList.add("pagination-dots", "hidden");
    leftDots.classList.add("left-dots");
    rightDots.textContent = "...";
    rightDots.classList.add("pagination-dots", "hidden");
    rightDots.classList.add("right-dots");
    container.insertBefore(leftDots, container.childNodes[1]);
    container.insertBefore(
      rightDots,
      container.childNodes[container.childNodes.length - 1]
    );
    return container;
  };

  const addInputs = (container) => {
    nodes.paginationRadioButtons = [...new Array(totalPages)].map((_, i) => {
      const inputNode = document.createElement("input");
      inputNode.setAttribute("type", "radio");
      inputNode.setAttribute("name", "page-nav");
      inputNode.setAttribute("id", `radio-${i + 1}`);
      inputNode.classList.add("radio-nav-input");
      return inputNode;
    });
    container.append(...nodes.paginationRadioButtons);
    return container;
  };

  const addEvent = (container) => {
    container.addEventListener("click", ({ target }) => {
      if (target.matches(".radio-nav-input")) {
        nodes.paginationRadioButtons.forEach((node) =>
          node.classList.remove("checked")
        );
        document
          .querySelector(`[for=${target.getAttribute("id")}]`)
          .classList.add("checked");

        updateVisibilityOfPaginationElements(nodes.radioNavContainer);
        updateContentAccordingToActiveFilters({
          page: parseInt(target.id.slice(6)),
        });
      }
    });
    return container;
  };

  const setCheckedFirstRadio = (container) => {
    container.querySelector(`input:first-of-type`).checked = true;
    return container;
  };

  return pipe(
    createContainer,
    addLabels,
    addThreeDots,
    addInputs,
    addEvent,
    setCheckedFirstRadio,
    updateVisibilityOfPaginationElements
  );
};

const createAndShowPage = (
  currentPage,
  amountOfFriends,
  totalPages = 1,
  filteredStorage
) => {
  const createFragmentFromFriends = () => {
    const fragment = document.createDocumentFragment();
    fragment.append(
      ...filteredStorage
        .slice(
          amountOfFriends * (currentPage - 1),
          amountOfFriends * currentPage
        )
        .map((friendCard) => createFriendCard(friendCard))
    );
    return fragment;
  };

  nodes.containerForFriendsNode.innerHTML = "";
  nodes.containerForFriendsNode.appendChild(createFragmentFromFriends());
  setTimeout(() => {
    nodes.containerForFriendsNode.childNodes.forEach((friendToShow) =>
      friendToShow.classList.remove("hidden")
    );
  }, 0);
  if (totalPages === 0) {
    document.querySelector(".radio-nav-container").innerHTML = "";
  } else if (document.querySelector(".radio-nav-container"))
    document
      .querySelector(".radio-nav-container")
      .replaceWith(createPagesNavigation({ totalPages, currentPage }));
  else {
    document
      .querySelector(".main")
      .append(createPagesNavigation({ totalPages, currentPage }));
  }
};

const doRecursiveFetch = (url, attempts) => {
  if (attempts === 0) return;
  return fetch(url)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .catch((_) => {
      return doRecursiveFetch(url, attempts - 1);
    });
};

const downloadFriends = ({
  pages = 5,
  seed = "google",
  friendsPerPage = 10,
}) => {
  const friendFieldsList = [
    "name",
    "dob",
    "email",
    "cell",
    "id",
    "gender",
    "picture",
  ];
  let loadingProgressDots = [];

  const showLoadingIndicator = () => {
    const loadingContainer = document.createElement("div");
    loadingContainer.classList.add("loading-container");
    const loadingText = document.createElement("span");
    loadingText.classList.add("loading-text");
    loadingText.insertAdjacentText("afterbegin", "Loading");
    loadingProgressDots = [...new Array(pages)].map((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("in-progress", "loading-dot");
      return dot;
    });
    loadingContainer.append(loadingText, ...loadingProgressDots);
    nodes.containerForFriendsNode.appendChild(loadingContainer);
  };

  showLoadingIndicator();
  state.loading = true;
  state.allFriends = [];
  Promise.all(
    [...new Array(pages)].map((_, i) => {
      return doRecursiveFetch(
        `https://randomuser.me/api/?inc=${friendFieldsList}&seed=${seed}&page=${
          i + 1
        }&results=${friendsPerPage}`
      ).then((response) => {
        loadingProgressDots[i].classList.remove("in-progress");
        state.allFriends = state.allFriends.concat(response.results);
      });
    })
  ).then(() => {
    state.loading = false;
    updateContentAccordingToActiveFilters({ page: 1 });
  });
};

let createFriendCard = (friend) => {
  const createFriendContainer = () => {
    const friendCard = document.createElement("article");
    friendCard.classList.add("friend-container", "hidden");
    return friendCard;
  };

  const addName = (friendCard) => {
    const friendName = document.createElement("h2");
    friendName.classList.add("name");
    friendName.textContent = `${friend.name.title}. ${friend.name.first} ${friend.name.last}`;
    friendCard.append(friendName);
    return friendCard;
  };

  const addPortrait = (friendCard) => {
    const friendPortrait = document.createElement("img");
    friendPortrait.setAttribute("src", friend.picture.large);
    friendPortrait.setAttribute("alt", "random friend");
    friendPortrait.classList.add("portrait");
    friendCard.append(friendPortrait);
    return friendCard;
  };

  const addDOB = (friendCard) => {
    const friendDOB = document.createElement("span");
    friendDOB.textContent = `I am ${friend.dob.age} years old.`;
    friendCard.append(friendDOB);
    return friendCard;
  };

  const addEmail = (friendCard) => {
    const friendEmail = document.createElement("a");
    friendEmail.textContent = friend.email;
    friendEmail.setAttribute("href", `mailto:${friend.email}`);
    friendEmail.classList.add("email");
    friendCard.append(friendEmail);
    return friendCard;
  };

  const addCell = (friendCard) => {
    const friendCell = document.createElement("a");
    friendCell.textContent = friend.cell;
    friendCell.setAttribute("href", `tel:${friend.cell}`);
    friendCell.classList.add("tel");
    friendCard.append(friendCell);
    return friendCard;
  };

  const addGender = (friendCard) => {
    const friendGender = document.createElement("span");
    friendGender.textContent = friend.gender.toUpperCase();
    friendCard.append(friendGender);
    return friendCard;
  };

  return pipe(
    createFriendContainer,
    addName,
    addPortrait,
    addDOB,
    addEmail,
    addCell,
    addGender
  );
};

const getFilteredStorage = (filter = state.friendsFilter) => {
  const cloneFriends = () => {
    return state.allFriends.slice();
  };

  const filterByAge = (friends) => {
    return friends.filter((friend) => {
      if (filter.ageFilterRange.max - filter.ageFilterRange.min <= 0) {
        return friends;
      }
      return (
        friend.dob.age >= filter.ageFilterRange.min &&
        friend.dob.age <= filter.ageFilterRange.max
      );
    });
  };

  const filterByName = (friends) => {
    return friends.filter((friend) =>
      `${friend.name.first} ${friend.name.last}`
        .toUpperCase()
        .includes(filter.nameFilter.toUpperCase())
    );
  };

  const filterBySex = (friends) => {
    if (filter.sexFilter === "all") {
      return friends;
    }
    return friends.filter((friend) => {
      return friend.gender === filter.sexFilter;
    });
  };

  const sortByAge = (friends) => {
    if (filter.sortByAge === null) {
      return friends;
    }
    return friends.slice().sort((friend1, friend2) => {
      return (friend1.dob.age - friend2.dob.age)*
        (filter.sortByAge === "ascending"?1:-1);
    });
  };

  const sortByName = (friends) => {
    if (filter.sortByName === null) {
      return friends;
    }
    return friends.slice().sort((friend1, friend2) => {
      return (`${friend1.name.first} ${friend1.name.last}` >
        `${friend2.name.first} ${friend2.name.last}`? 1: -1)
        *(filter.sortByName === "ascending"?1:-1);
    });
  };

  return pipe(
    cloneFriends,
    filterByAge, 
    filterByName, 
    filterBySex, 
    sortByAge, 
    sortByName
  );
};

const updateContentAccordingToActiveFilters = ({ page = 1 }) => {
  if (state.loading) return undefined;
  const filteredfriendsStorage = getFilteredStorage();
  const { amountPerPage: amountOfFriendsPerPage, amountOfPages: totalPages } =
    calcPagesAmount(
      nodes.containerForFriendsNode.clientHeight,
      nodes.containerForFriendsNode.clientWidth,
      filteredfriendsStorage.length
    );
  createAndShowPage(
    page,
    amountOfFriendsPerPage,
    totalPages,
    filteredfriendsStorage
  );
};

const addEventListeners = () => {
  document.querySelector("#confirm").addEventListener("click", (event) => {
    document.querySelector("#burger-checkbox").checked = false;
  });
  document
    .querySelector("#name-input")
    .addEventListener("input", ({ target }) => {
      state.friendsFilter.nameFilter =
        document.querySelector("#name-input").value;
      updateContentAccordingToActiveFilters({ page: 1 });
    });
  document
    .querySelector(".age-filter-container")
    .addEventListener("input", ({ target }) => {
      if (target.matches(".age-input")) {
        if (target.getAttribute("id") === "start-age")
          state.friendsFilter.ageFilterRange.min = target.value
            ? +target.value
            : state.friendsFilter.MIN_AGE;
        else if (target.getAttribute("id") === "end-age")
          state.friendsFilter.ageFilterRange.max = target.value
            ? +target.value
            : state.friendsFilter.MAX_AGE;
        updateContentAccordingToActiveFilters({ page: 1 });
      }
    });
  document
    .querySelector(".controls-layout-container")
    .addEventListener("click", (event) => {
      if (event.target.matches("button")) {
        event.preventDefault();
      }
      const target = event.target;
      const id = target.id;
      if (target.matches(".sort-menu-button")) {
        document
          .querySelectorAll(".sort-menu-button")
          .forEach((buttonNode) => buttonNode.classList.remove("selected"));
        target.classList.add("selected");
      }
      if (id === "age-ascending")
        (state.friendsFilter.sortByAge = "ascending"),
          (state.friendsFilter.sortByName = null);
      else if (id === "age-descending")
        (state.friendsFilter.sortByAge = "descending"),
          (state.friendsFilter.sortByName = null);
      else if (id === "name-ascending")
        (state.friendsFilter.sortByName = "ascending"),
          (state.friendsFilter.sortByAge = null);
      else if (id === "name-descending")
        (state.friendsFilter.sortByName = "descending"),
          (state.friendsFilter.sortByAge = null);
      else if (["all", "male", "female"].includes(id)) {
        state.friendsFilter.sexFilter = target.value;
        updateContentAccordingToActiveFilters({ page: 1 });
      } else if (id === "reset") {
        resetFilters();
        document.querySelectorAll(".selected").classList.remove("selected");
        document.querySelector("#start-age").value = "";
        document.querySelector("#end-age").value = "";
        document.querySelector("#name-input").value = "";
        document.querySelector("#all").checked = true;
      }
      if (target.matches("button"))
        updateContentAccordingToActiveFilters({ page: 1 });
    });
  window.addEventListener("resize", resizeThrottler, false);
};

const resizeThrottler = (() => {
  let resizeTimeout;
  return () => {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        updateContentAccordingToActiveFilters({ page: 1 });
      }, 66);
    }
  };
})();

document.addEventListener("DOMContentLoaded", (event) => {
  addEventListeners();
  nodes.containerForFriendsNode = document.querySelector(".friends-container");
  nodes.radioNavContainer = document.querySelector(".radio-nav-container");
  downloadFriends({});
});

