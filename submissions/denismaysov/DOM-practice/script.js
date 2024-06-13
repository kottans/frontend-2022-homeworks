
const navList = document.querySelector(".main__nav-list")
const content = document.querySelector(".content");
let arr = [
    {
        id: "Vito Scaletta",
        text: `<div class="content__wrapper"><h3 class="content__title">Vittorio Antonio Scaletta</h3>
        <img class="content__image" src="./assets/Vito_Scaletta.jpeg" alt="" width="350px" height="461px"/>
        <p>Vito Scaletta is the protagonist of the second Mafia Series video game - Mafia II. He is an up-and-coming gangster in the Empire Bay criminal underworld who became a made member of the Falcone Crime Family.</p>
        <p class="content__quote">"You know when we first started out, I thought I was gonna be the biggest, baddest wiseguy in the world."</p></div>`
    },
    {
        id: "Joe Barbaro",
        text: `<div class="content__wrapper"><h3 class="content__title">Joe Barbaro</h3>
        <img class="content__image" src="./assets/Joe_Barbaro.jpeg" alt="" width="250px" height="294px"/>
        <p>Joe Barbaro is the secondary protagonist of Mafia II, the protagonist of Joe's Adventures, and Vito Scaletta's best friend. While Vito was fighting in World War II, Joe began working for the Clemente Crime Family. When Vito returned, Joe invites him to join in on his life of crime.</p>
        <p class="content__quote">"Wiseguys. You work for them, you're set. You fuck with 'em, you die."</p></div>`
    },
    {
        id: "Leo Galante",
        text: `<div class="content__wrapper"><h3 class="content__title">Leo Galante</h3>
        <img class="content__image" src="./assets/Leo_Galante.jpeg" alt="" width="350px" height="286px"/>
        <p>Leo Galante is the Consigliere of the Vinci Crime Family and a character in Mafia II and Mafia III.</p>
        <p class="content__quote">"I've probably forgotten more about this business than you'll ever learn."</p></div>`
    },
    {
        id: "Antonio Balsamo",
        text: `<div class="content__wrapper"><h3 class="content__title">Antonio Balsamo</h3>
        <img class="content__image" src="./assets/Antonio_Balsamo.jpeg" alt=""width="350px" height="254px" />
        <p>Antonio Balsamo is a character in Mafia II.</p>
        <p class="content__quote">"You got some balls coming back."</p></div>`
    },
];

function createNav(){
    let temp = "";
    arr.forEach(item => {
        temp += `<li><span class="main__nav-item">${item.id}</span></li>`;
    })
    navList.innerHTML = temp;
};
window.addEventListener('DOMContentLoaded', createNav);

function createContent(target){
    arr.forEach(item =>{
        if(target.innerText === item.id){
            content.innerHTML = item.text;
        }
    });
}
navList.addEventListener('click',({target})=>{
    if(target.closest(".main__nav-item")){
        createContent(target);
    }
})
