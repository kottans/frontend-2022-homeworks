const postsLst = [
    {
        id: '1',
        topzoneImg:'./img/2.png',
        p:'@Jonnie',
        imgSrc: './img/post1.jpg',
        imgSrc2: './img/post2.jpg',
        imgSrc3: './img/post3.jpg',
        imgSrc4: './img/post4.jpg'
    },
    {
        id: '2',
        topzoneImg:'./img/3.png',
        p:'@Mike',
        imgSrc: './img/post5.jpg',
        imgSrc2: './img/post6.jpg',
        imgSrc3: './img/post7.jpg',
        imgSrc4: './img/post8.jpg'
    },
    {
        id: '3',
        topzoneImg:'./img/1.png',
        p:'@Kate',
        imgSrc: './img/post9.jpg',
        imgSrc2: './img/post10.jpg',
        imgSrc3: './img/post11.jpg',
        imgSrc4: './img/post12.jpg'
    },
    {
        id: '4',
        topzoneImg:'./img/4.png',
        p:'@Jack',
        imgSrc: './img/post13.jpg',
        imgSrc2: './img/post14.jpg',
        imgSrc3: './img/post15.jpg',
        imgSrc4: './img/post16.jpg'
    }

];

const btnContainer = document.querySelector('.friends');
const mainContainer = document.querySelector('.posts');

btnContainer.addEventListener('click', addContent);

function addContent({ target }) {
    if (target.id) {
        const contant = postsLst.find((pos) => pos.id === target.id);
        mainContainer.innerHTML = post(contant);
    }
};

function post({ imgSrc, imgSrc2, imgSrc3, imgSrc4, p, topzoneImg}) {

    return (
        `<article class="post">
            <div class="topzone">
                <img class="topzoneImg" src="${topzoneImg}" alt="postImg">
                <p>${p}</p>
            </div>
            <div class="postImg">
                <img src="${imgSrc}" class="postImg" alt="postImg">
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
        </article>
        <article class="post">
            <div class="topzone">
                <img class="topzoneImg" src="${topzoneImg}" alt="postImg">
                <p>${p}</p>
            </div>
            <div class="postImg">
                <img src="${imgSrc2}" class="postImg" alt="postImg">
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
        </article>
        <article class="post">
            <div class="topzone">
                <img class="topzoneImg" src="${topzoneImg}" alt="postImg">
                <p>${p}</p>
            </div>
            <div class="postImg">
                <img src="${imgSrc3}" class="postImg" alt="postImg">
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
        </article>
        </article>
        <article class="post">
            <div class="topzone">
                <img class="topzoneImg" src="${topzoneImg}" alt="postImg">
                <p>${p}</p>
            </div>
            <div class="postImg">
                <img src="${imgSrc4}" class="postImg" alt="postImg">
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
        
    );
};
