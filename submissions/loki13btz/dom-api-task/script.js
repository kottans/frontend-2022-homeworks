const sideMenuContent = [
  {
    id: 1,
    img: "./img/sea1.jpg",
    title: "Home page",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, incidunt amet ea voluptas nihil tempora.",
  },
  {
    id: 2,
    img: "./img/sea2.jpg",
    title: "Work page",
    content:
      "Justo laoreet sit amet cursus sit amet dictum sit amet. Aliquam purus sit amet luctus venenatis lectus magna. Sapien nec sagittis aliquam malesuada bibendum arcu. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Dictum non consectetur a erat nam. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan. Consequat semper viverra nam libero justo laoreet sit amet cursus. Consectetur lorem donec massa sapien faucibus. Mauris in aliquam sem fringilla ut morbi. Sed risus pretium quam vulputate dignissim. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Eu sem integer vitae justo eget magna fermentum iaculis eu. Vitae tempus quam pellentesque nec nam aliquam sem et tortor.",
  },
  {
    id: 3,
    img: "./img/sea3.jpg",
    title: "About page",
    content:
      "Praesent elementum facilisis leo vel fringilla. Vestibulum lectus mauris ultrices eros. Fermentum leo vel orci porta non. Netus et malesuada fames ac turpis egestas integer eget aliquet. Leo vel fringilla est ullamcorper. At consectetur lorem donec massa sapien faucibus et. Et tortor at risus viverra adipiscing. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Vitae suscipit tellus mauris a. Scelerisque eleifend donec pretium vulputate sapien. Dolor magna eget est lorem ipsum.",
  },
  {
    id: 4,
    img: "./img/sea4.jpg",
    title: "Blog page",
    content:
      "Non cura dolor. Luctus venenatis lectus magna fringilla urna porttitor rhoncus. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Auctor eu augue ut lectus arcu bibendum. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci. Eget mi proin sed libero enim sed. Dui id ornare arcu odio ut sem nulla. Arcu dui vivamus arcu felis bibendum ut tristique. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Aliquam nulla facilisi cras fermentum odio. Lectus urna duis convallis convallis tellus. Sit amet mattis vulputate enim. Nunc congue nisi vitae suscipit tellus mauris a.",
  },
  {
    id: 5,
    img: "./img/sea5.jpg",
    title: "Contact page",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

$(function () {
  let $menuItems = $(".side-menu_item");
  function renderContent(menuId) {
    let $menuContent = $(".side-menu_content");
    let $pageContent = $(".content .content-wrapper");
    let $pageTitle = $('<h1 class="content-title"></h1>');
    let $pageDescription = $('<p class="content-description"></p>');
    const { id, img, title, content } = sideMenuContent.find(
      ({ id }) => id === menuId
    );
    $pageContent.html("");
    $menuContent.css("background-image", `url(${img})`);
    $pageTitle.text(title);
    $pageDescription.text(content);
    $pageContent.append($pageTitle).append($pageDescription);
  }
  function clearActive() {
    $menuItems.removeClass("active");
  }

  $menuItems.on("click ", function () {
    let menuItemId = $(this).data("id");
    clearActive();
    $(this).addClass("active");
    renderContent(menuItemId);
  });
  $menuItems.keydown(function (e) {
    if (e.keyCode == 32) {
      let menuItemId = $(this).data("id");
      clearActive();
      $(this).addClass("active");
      renderContent(menuItemId);
    }
  });
  renderContent(1);
});
