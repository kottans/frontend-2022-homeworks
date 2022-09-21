const content = document.getElementById('content');

export const renderSpinner = () => {
  content.innerHTML = `<div class="semipolar-spinner">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>`;
};

export const renderCards = (arr) => {
  const cardsWrapper = document.createElement('div');
  cardsWrapper.id = 'cards-wrapper';
  if (!arr.length) {
    cardsWrapper.insertAdjacentHTML(
      'beforeend',
      `<p class="nobody-message">Ooops!!! It looks like you filtered out everyone!</p>`
    );
  } else {
    arr.forEach((item) => {
      const { age, gender, email, title, name, picture, phone } = item;
      cardsWrapper.insertAdjacentHTML(
        'beforeend',
        `<article class='card' data-gender="${gender}">
  <div class='card-top'>
    <div class="title-and-name">
      <h3 class='card-title'>${title}.</h3>
      <h2 class='card-name'>${name}</h2>
    </div>
    <div class="pic-and-age">  
      <img
      src=${picture}
      alt="photo of ${title} ${name}"
      class='card-image'
      />
      <span class='card-age'>${age} y.o.</span>
    </div>
  </div>
  <div class='card-bottom'>
    <div class='card-phone'>
      <img class='icon' src='./img/phone.svg' alt='phone icon' />
      <a href="tel:${phone}">${phone}</a>
    </div>
    <div class='card-email'>
      <img class='icon' src='./img/email.svg' alt='email icon' />
      <a href="mailto:${email}">${email}</a>  
    </div>
  </div>
</article>`
      );
    });
  }
  content.innerHTML = '';
  content.appendChild(cardsWrapper);
};
