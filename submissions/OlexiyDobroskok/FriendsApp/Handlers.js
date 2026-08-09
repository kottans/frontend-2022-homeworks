import {
  createDetailedPersonsInfo,
  renderPersonsList,
  resetForm,
  showPage,
} from "./Render.js";
import { showFilteredPersons } from "./FilterLogic.js";
import {
  changeSideBtnName,
  updateVisualPageToDefaultSettings,
} from "./Service.js";

let friendsIdList = [];
let friendsList = [];

export function contentAreaHandler({ target }, persons) {
  const selectedPage = target.closest(".page__link");
  const activePerson = target.closest(".person__item");
  if (!activePerson && !selectedPage) return;
  if (selectedPage) showPage(selectedPage, persons);
  if (activePerson) createDetailedPersonsInfo(activePerson, persons);
}

export function detailedInfoBtnsHandler({ target }, persons) {
  const activeBtn = target.closest(".friend__btn");
  const addFriendBtn = target.closest(".add__friend");
  const deleteFriendBtn = target.closest(".delete__friend");
  if (!activeBtn) return;
  const iconInFriends = document.querySelector(".detailed__icon__infriends");
  const activePersonId = activeBtn.dataset.personId;
  if (!!addFriendBtn) {
    const repeatId = friendsIdList.find(
      (friendId) => friendId == activePersonId
    );
    if (repeatId === undefined) {
      friendsIdList.push(activePersonId);
      iconInFriends.classList.remove("hide__btn");
      addFriendBtn.classList.add("hide__btn");
      const deleteFriendBtn = document.querySelector(".delete__friend");
      deleteFriendBtn.classList.remove("hide__btn");
      showFilteredPersons(persons);
    }
  }
  if (!!deleteFriendBtn) {
    friendsIdList = friendsIdList.filter(
      (friendsId) => friendsId !== activePersonId
    );
    iconInFriends.classList.add("hide__btn");
    deleteFriendBtn.classList.add("hide__btn");
    const addFriendBtn = document.querySelector(".add__friend");
    addFriendBtn.classList.remove("hide__btn");
    showFilteredPersons(persons);
  }
}

export function changeDisplayMode({ target }, persons) {
  const myFriendsBtn = target.closest(".my__friends__btn");
  const allPeopleBtn = target.closest(".all__persons__btn");
  if (!myFriendsBtn && !allPeopleBtn) return;
  if (!!myFriendsBtn) {
    friendsList = friendsIdList.map((friendId) =>
      persons.find((person) => person.id == friendId)
    );
    const allPeopleBtn = document.querySelector(".all__persons__btn");
    allPeopleBtn.classList.remove("select__btn");
    myFriendsBtn.classList.add("select__btn");
    myFriendsBtn.setAttribute("data-friends-btn", "open");
    renderPersonsList(friendsList);
    updateVisualPageToDefaultSettings();
  }
  if (!!allPeopleBtn) {
    const myFriendsBtn = document.querySelector(".my__friends__btn");
    allPeopleBtn.classList.add("select__btn");
    myFriendsBtn.classList.remove("select__btn");
    myFriendsBtn.setAttribute("data-friends-btn", "close");
    renderPersonsList(persons);
    updateVisualPageToDefaultSettings();
  }
}

export function filterBtnsHandler({ target }, persons) {
  const resetBtn = target.closest(".reset__filter__btn");
  const sideBtn = target.closest(".filter__btn");
  if (!resetBtn && !sideBtn) return;
  if (!!sideBtn) {
    const filterMenu = document.querySelector("#filter__menu");
    filterMenu.classList.toggle("filter__menu__hide");
    filterMenu.classList.toggle("filter__menu");
    changeSideBtnName();
  }
  if (!!resetBtn) resetForm(persons);
}

export { friendsList, friendsIdList };
