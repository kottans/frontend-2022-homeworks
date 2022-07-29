let btn = document.querySelector(".burger-menu");
let popup = document.querySelector(".popup");
let popupContent = document.querySelector(".popup__content");
let menuContent = document.querySelector(".menu__content");
let text = new Map();
text
  .set(
    "first",
    "<h2>First Information</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore commodi unde  eos natus corporis nobis est voluptates excepturi ipsam repellat sit libero  perspiciatis quia praesentium, harum ab aliquam exercitationem minus?</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit  incidunt tenetur numquam debitis doloribus iusto voluptatem, ab fugit corporis  quisquam saepe vel omnis perferendis ex inventore odio totam? Dolorem?</p><p>  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet excepturi  dolorum temporibus sequi beatae, facilis repellendus, tempore alias  consequuntur perferendis iste quisquam ea quae possimus delectus dicta ut  architecto similique.</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iste  sint eos nam vitae aperiam voluptate repellat modi optio, soluta quos deleniti  placeat necessitatibus tempora, aliquid inventore corporis delectus maiores.</p>"
  )
  .set(
    "second",
    "<h2>Second Information</h2><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde deleniti  placeat vel libero quae totam assumenda sed quaerat. Minus dolorum fugit  repudiandae totam tempora quos, unde reiciendis nemo neque id!</p><p>  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum ipsam nam  cupiditate deserunt ea officiis unde voluptates qui totam repellendus  voluptatem ex ullam exercitationem esse, voluptatum itaque culpa eius aperiam!</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium alias  quisquam, hic voluptatum explicabo perspiciatis natus eius, iste quas quae at  quos recusandae et, molestias corrupti illo blanditiis delectus deserunt?</p><p>  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit repudiandae  tenetur doloremque porro quasi error fuga quos non necessitatibus eaque  tempora nemo similique laboriosam, excepturi sed laudantium, architecto nihil  facilis?</p>"
  )
  .set(
    "third",
    "<h2>Third Information</h2><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem  inventore omnis perspiciatis alias voluptatibus sequi quam atque sit, animi, id itaque hic accusantium doloremque ab deserunt. Ipsum ipsa architecto est?</p><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi veniam nobis  mollitia cupiditate dolores quisquam vitae eaque corrupti in vel, ipsam neque  iusto natus eos eum hic illo excepturi enim.</p><p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis laboriosam,  laborum aspernatur, quas, similique rerum labore nihil voluptatum praesentium  odit nostrum modi. Facilis a quidem, nulla laborum aut facere fuga.</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolore rerum  repellat dicta dolores nihil voluptatem voluptas maxime sunt exercitationem  cupiditate, deleniti, voluptate tenetur? Blanditiis rem ea rerum? Quae, sit!</p>"
  )
  .set(
    "four",
    "<h2>Four Information</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum voluptas beatae  eius at, laudantium, veritatis eos totam hic molestiae saepe ad quos deserunt  itaque. Corporis aperiam consequuntur fuga eius earum?</p><p>  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, accusantium  delectus. Reiciendis libero ea vero nulla dolores voluptate sed pariatur  laboriosam molestiae, nostrum at fugiat ducimus vitae doloremque quaerat ab?</p><p>  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque voluptates vel  nihil nostrum ullam beatae consequuntur nulla exercitationem reiciendis?  Deserunt neque nam cum totam quam debitis tenetur delectus fuga quidem.</p><p>  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut vero, tempora  quia deserunt ullam ea voluptatem ad ipsam quas quos voluptatibus  exercitationem magnam est pariatur soluta tempore placeat repudiandae omnis?</p>"
  );

btn.addEventListener("click", showPopup);
popup.addEventListener("click", closePopup);

function showPopup(event) {
  popup.style.display = "block";
  if (event.target == popup) popup.style.display = "none";
}

function closePopup(event) {
  if (event.target == popup) popup.style.display = "none";
}

popupContent.addEventListener("click", (event) => {
  if ((event.target = "LI")) {
    changeText(event);
  }
});

menuContent.addEventListener("click", (event) => {
  if ((event.target = "LI")) {
    changeText(event);
  }
});

function changeText(event) {
  let className = event.target.classList;
  document.querySelector(".main__content").innerHTML = text.get(`${className}`);
}

document.querySelector(".logo").addEventListener("click", () => {
  document.querySelector(".main__content").innerHTML =
    "<h1>Main Information</h1><p>  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui  perspiciatis assumenda atque fugit facilis illum nobis totam fugiat  aliquid, ratione sapiente ullam quo, repudiandae ipsum ducimus  deleniti quos corporis sunt.</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus  ipsa amet corrupti nisi, corporis distinctio velit tenetur omnis  iusto adipisci fugiat soluta inventore qui vel est nobis consectetur  reprehenderit consequuntur!</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti  quam mollitia quisquam rerum illum enim eum, perspiciatis obcaecati,  maiores iste dolorem! Dignissimos, cumque rerum minima quas impedit  molestiae ea quo?</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,  itaque quasi inventore consequuntur animi possimus, sint temporibus  assumenda, molestiae suscipit aut perferendis minus! Dolores atque  architecto praesentium debitis ullam libero.</p>";
});
