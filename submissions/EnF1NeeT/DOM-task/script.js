

const postsList  = [
    {
        id: '1',
        topzoneImg:'./img/2.png',
        nickname:'@Jonnie',
        imageList: ['./img/post1.jpg',
                 './img/post2.jpg',
                 './img/post3.jpg',
                 './img/post4.jpg']
    },
    {
        id: '2',
        topzoneImg:'./img/3.png',
        nickname:'@Mike',
        imageList: ['./img/post5.jpg',
         './img/post6.jpg',
         './img/post7.jpg',
         './img/post8.jpg']
    },
    {
        id: '3',
        topzoneImg:'./img/1.png',
        nickname:'@Kate',
        imageList: ['./img/post9.jpg',
         './img/post10.jpg',
         './img/post11.jpg',
         './img/post12.jpg']
    },
    {
        id: '4',
        topzoneImg:'./img/4.png',
        nickname:'@Jack',
        imageList: ['./img/post13.jpg',
         './img/post14.jpg',
         './img/post15.jpg',
         './img/post16.jpg']
    }

];

const btnContainer = document.querySelector('.friends');
const mainContainer = document.querySelector('.posts');

btnContainer.addEventListener('click', targetContent );

function targetContent ({ target }) {
    if (target.id) {
        const contant = postsList.find((post) => post.id === target.id);
        mainContainer.innerHTML = postGenerator(contant);
    }
};


function postGenerator({nickname, topzoneImg, imageList}, list) {
    for (let i=0; i<imageList.length; i++) {
        list += `<article class="post">
                <div class="topzone">
                    <img class="topzoneImg" src="${topzoneImg}" alt="postImg">
                    <p>${nickname}</p>
                </div>
                <div class="postImg">
                    <img src="${imageList[i]}" class="postImg" alt="postImg">
                </div>
                <div class="actionZone">
                    <button class="btn">
                        <img src="./img/favorite_FILL0_wght400_GRAD0_opsz48.png" alt="" class="btnImg">
                        Like
                    </button>
                    <button class="btn">
                        <img src="./img/forum_FILL0_wght400_GRAD0_opsz48.png" alt="" class="btnImg">
                        Comment
                    </button>
                    <button class="btn">
                        <img src="./img/send_FILL0_wght400_GRAD0_opsz48.png" alt="" class="btnImg">
                        Share
                    </button>
                </div>
                <div class="postTime">posted <time datetime="24.5.3222">posted 5h ago</time></div>
                </article>`
        };
    return list;
};