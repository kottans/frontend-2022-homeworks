// add data
const asanas = [
    {
        id: "1",
        name: "Butterfly Pose",
        img: "./img/butterfly-pose.png",
        description: "A classic hip opener, Butterfly Pose is also called Bound Angle Pose or Cobbler Pose. In Sanskrit, it’s known as Baddha Konasana. Butterfly Pose is suitable for all levels, so it’s a useful addition to most yoga routines. Because the posture improves flexibility and reduces tension, it’s ideal for people who have tight hips due to excessive sitting or high intensity workouts.",
        benefits: "Sitting upright and elongating your spine in Butterfly Pose helps improve posture and body awareness. The pose targets the low back, hip, and thigh muscles, helping to reduce pain, encourage flexibility, and increase range of motion. Overall, Butterfly Pose has a soothing, relaxing effect both physically and mentally and may help boost energy levels. It may also help release emotions stored in your hips and the surrounding areas. To enhance these stress-relieving effects, focus on deep breathing or practice a breathing exercise while you’re in the pose."
    },
    { 
        id: "2",
        name: "Pigeon Pose",
        img: "./img/pigeon-pose.png",
        description: "Pigeon Pose (formally known as Kapotasana in Sanskrit) is a popular yoga pose that stretches your hips and lower back. Though it can be a great way to increase flexibility and stretch your muscles, it’s important to perform the move correctly to prevent injury or strain.",
        benefits: "This pose focuses on opening your hips, which supports mobility and flexibility in that joint. Pigeon Pose also stretches your hip flexors and lower back, which are commonly tight due to prolonged sitting. Stretching these muscles regularly may alleviate mild lower back or hip pain. This pose is also believed to support digestion through gentle stretching and movement of your lower abdomen. This may assist with peristalsis — the movement of digested food through the intestinal tract."
    },
    { 
        id: "3",
        name: "Wide-legged Child’s Pose",
        img: "./img/child-pose.png",
        description: "This forward bend allows you to draw your attention inward while releasing tension. Wide-legged Child’s Pose stretches your spine, hips, and inner thighs. Greenspoon recommends this pose for its ability to reenergize while helping you feel grounded and connected to the earth.",
        benefits: "Flexes the body's internal organs and keeps them supple. It lengthens and stretches the spine. Relieves neck and lower back pain when performed with the head and torso supported. It gently stretches the hips, thighs and ankles."
    },
    { 
        id: "4",
        name: "Supine Spinal Twist",
        img: "./img/spinal-twist-pose.png",
        description: "This pose improves flexibility in your chest, spine, and glutes.",
        benefits: "The supine spinal twist pose massages the abdominal organs, calms the mind, and relaxes the body. This pose also relieves lower back pain, opens the shoulders, and elongates the spine."
    },
    { 
        id: "5",
        name: "Legs-Up-the-Wall Pose",
        img: "./img/legs-up-the-wall-pose.png",
        description: "Legs-Up-the-Wall Pose restores energy levels, boosts circulation, and promotes relaxation.",
        benefits: " Legs Up the Wall is a great way to calm your nerves and make you feel better. You’ll be able to relax deeply, release anxiety and tension, and get back into balance. It can bring the body back to its own innate capacity for rest, relaxation, and self-healing."
    }
];

const [firstPage] = asanas;

// create menu list

const navigationList = document.querySelector(".navigation__list");

function createMenuList(data) {
    const menu = data
    .map((asana) => `<li class="navigation__item"><a href="#" id="${asana.id}" class="navigation__link">${asana.name}</a></li>`)
    .join("");
    navigationList.innerHTML = menu;
};

// add content

const mainContent = document.querySelector(".main__content");

function main({name, img, description, benefits}) {
    return (
        `<h2 class = "main__title">${name}</h1>
        <img src=${img} class = "main__img">
        <h3 class = "main__subtitle">Description</h3>
        <p class = "main__text">${description}</p>
        <h3 class = "main__subtitle">Benefits</h3>
        <p class = main__text>${benefits}</p>`
    );
}

//event listener

const changeContent = function(event) {
    const asana = asanas.find((asana) => asana.id === event.target.id);
    mainContent.innerHTML = main(asana)
};

//init first page
  
function initPage(){
    createMenuList(asanas);
    navigationList.addEventListener("click", changeContent);
    mainContent.innerHTML = main(firstPage)
}
  
initPage();
