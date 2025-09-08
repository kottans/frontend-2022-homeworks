const getTemplateFriend = (user) => {
  return `<li class="main-box-list-item">
            <img class="friend-img" src="${user.picture.large}" alt="">
            <p class="friend-name">${user.name.first} ${user.name.last}</p>
            <p class="friend-text">
              <svg class="friend-gender-svg" width="20" height="20">
                <use href="./images/sprite.svg#female-and-male"></use>
              </svg>
              <span class="friend-text-span">${user.gender}, ${user.dob.age} years old</span>
            </p>
            <p class="friend-text">
              <svg class="friend-phone-svg" width="20" height="20">
                <use href="./images/sprite.svg#phone"></use>
              </svg>
              <span class="friend-text-span">${user.cell}</span>
            </p>
            <p class="friend-text">
              <svg class="friend-location-svg" width="20" height="20">
                <use href="./images/sprite.svg#location"></use>
              </svg>
              <span class="friend-text-span">${user.location.country}</span>
            </p>
          </li>`;
};

export { getTemplateFriend };
