
const FACTS = [
  {
      title: 'title 1',
      info: '11111 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur?',
      img: 'assets/1.jpg',
  },
  {
      title: 'title 2',
      info: '22222 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur? 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur? 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur? 2',
      img: 'assets/2.jpg',
  },
  {
      title: 'title 3',
      info: '33333 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur? 3',
      img: 'assets/3.jpg',
  },
  {
      title: 'title 4',
      info: '44444 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore  Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur? 2ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur? 4',
      img: 'assets/4.jpg',
  },
  {
      title: 'title 5',
      info: '55555 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur? 5',
      img: 'assets/5.jpg',
  },
];

const mainInfo = document.querySelector('.main__info');
mainInfo.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse et reprehenderit labore ipsam eos quam blanditiis repellendus reiciendis fugiat? Sed quod excepturi vel laudantium itaque perferendis ullam, dolorum pariatur?";

const openFullPreview = function (imgItem) {

  return function () {
    // ищем елемент по классу куда запишем карточку
    const bigPictureFragment = document.querySelector('.big-picture');
    // при запуске функции прячем класс хидн, тем самым открываем попап с карточкой
    bigPictureFragment.classList.remove('hidden');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');
    mainContentWrapper.classList.add('hidden');
    

    // функция уделения (скрытия) карточки при клике на карточку (зависит от класса)
    const handlerClose = function (event) {
      const targetElement = event.target;
      switch (targetElement.className) {
        case 'big-picture overlay':
        case 'big-picture__cancel  cancel':
          bigPictureFragment.classList.add('hidden'); 
          document.querySelector('.big-picture').removeEventListener('click', handlerClose);
          mainContentWrapper.classList.remove('hidden');
          break;
        default:
          break;
      }
    };

    // функция уделения (скрытия) карточки при нажатии Esc
    const handlerEsc = function (event) {
      if (event.keyCode === 27) {
        bigPictureFragment.classList.add('hidden');
        document.removeEventListener('keyup', handlerEsc);
      }
    };

// заполняем попап
    const t = document.querySelector('.fact__big__title');
    t.textContent = imgItem.title;

    const p = document.querySelector('.fact__big__info');
    p.textContent = imgItem.info;

    document.querySelector('.big-picture__img img').src = imgItem.img;

    // вешаем слушатели событий
    document.querySelector('.big-picture').addEventListener('click', handlerClose);
    document.addEventListener('keyup', handlerEsc);
  };
};

const addPicture = function () {
  const PICTURE = document.querySelector('.listFacts');
  const templateFragment = document
    .querySelector("#picture")
    .content.querySelector(".picture");
  const fragment = document.createDocumentFragment();

  FACTS.forEach((element) => {
    const photo = templateFragment.cloneNode(true);
    photo.querySelector(".fact__img").src = element.img;
    photo.querySelector(".fact__title").textContent = element.title;
    photo.querySelector(".fact__title").onclick = openFullPreview(element);
    photo.querySelector(".fact__info").textContent = element.info;
    fragment.appendChild(photo);
  });
  PICTURE.appendChild(fragment);
};

addPicture();



