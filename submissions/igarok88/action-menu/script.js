const content = [
  {
    title: "Головна",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam velit cupiditate molestias. Eius eligendi repellat modi. Eveniet doloremque ducimus magni.",
  },
  {
    title: "Про нас",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ut eveniet nostrum recusandae rerum ea. Incidunt necessitatibus velit cupiditate quae possimus minus id quod quia delectus voluptatum tenetur expedita fugit maxime, impedit architecto nam iusto quas tempore! Libero reiciendis vero recusandae corrupti ex unde animi similique ipsa laboriosam voluptatem. Explicabo?",
  },
  {
    title: "Підтримка",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe placeat adipisci quos sed recusandae voluptatem ea, tempore ad, similique a, excepturi tenetur necessitatibus cumque quidem perspiciatis. Quasi voluptate quo aspernatur!",
  },
  {
    title: "Доставка",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, et soluta reprehenderit veniam distinctio deleniti ut suscipit quod earum minus saepe unde quis voluptates? Inventore illum iste aperiam quas? Dolorem repellendus omnis corporis molestias veniam. Quibusdam temporibus quas molestias debitis.",
  },
  {
    title: "Гарантії",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt repudiandae officia commodi vitae laboriosam eveniet tempore debitis error recusandae ut unde temporibus, sunt corrupti maiores eaque, aliquam consequuntur accusantium. Necessitatibus adipisci excepturi dolore facere cum sunt quam libero asperiores, tempora blanditiis in aut repellendus optio id obcaecati, incidunt doloremque dicta, quas dolor quasi ratione consectetur expedita repellat? Quaerat, cum. Tempora?",
  },
];

const actionSidebarUl = document.querySelector(".action__sidebar ul");

content.forEach((item) => {
  actionSidebarUl.innerHTML += `<li>${item.title}</li>`;
});

const actionSidebarLi = document.querySelectorAll(".action__sidebar li");
actionSidebarLi[0].classList.add("active");

const actionContent = document.querySelector(".action__content");

actionContent.innerHTML = `
    <h2>${content[0].title}</h2>
    <p>${content[0].content}</p>
    `;

actionSidebarUl.addEventListener("click", (e) => {
  actionSidebarLi.forEach((item) => {
    item.classList.remove("active");
  });
  e.target.classList.add("active");

  actionSidebarLi.forEach((item, index) => {
    if (item.closest(".active")) {
      actionContent.innerHTML = `
        <h2>${content[index].title}</h2>
        <p>${content[index].content}</p>
      `;
    }
  });
});
