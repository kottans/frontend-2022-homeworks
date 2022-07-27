document.body.onload = () => {
    const initializeContentArray = () => {
        const articles = [
            `		<article><h2  class="content-heading">Карп</h2>
			<a
				title="USFWS, Public domain, via Wikimedia Commons"
				href="https://commons.wikimedia.org/wiki/File:Common_carp.jpg"
				><img class="content-img"
					alt="Common carp"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Common_carp.jpg/512px-Common_carp.jpg"
			/></a>
			<section>
				<h3  class="content-heading">Общая информация о рыбе</h3>
				Крупная всеядная рыба с толстым, умеренно удлинённым телом, покрытым крупной,
				гладкой, плотно сидящей чешуёй. Бока золотистого цвета, спина темноватая. Населяет
				тихие, стоячие или медленно текущие воды с твёрдым глинистым, слегка заиленным дном.
				В низовьях рек, впадающих в Чёрное море, встречается в солоноватых водах.
			</section>
			<section>
				<h3  class="content-heading">Приготовление</h3>
				Рыба очень жирная, по-этому для жарки нужно нарезать мелкими кусками. Имеет сильный
				сладковатый вкус, по-этому из специй достаточно одной соли по вкусу. При запекании
				тоже нужно учитывать жирность и добавлять специи, лучше сильно-острые и лимонные.
			</section>
        </article>`,
            `		<article>
    <h2  class="content-heading">Белый амур</h2>
    <a
        title="Hagerty, Ryan/USFWS, Public domain, via Wikimedia Commons"
        href="https://commons.wikimedia.org/wiki/File:Grass_carp_portrait.jpg"
        ><img class="content-img"
            alt="Grass carp portrait"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Grass_carp_portrait.jpg/512px-Grass_carp_portrait.jpg"
    /></a>
    <section>
        <h3  class="content-heading">Общее описание рыбы</h3>
        Пресноводная растительноядная рыба. Тело удлинённое, цилиндрической формы, почти не
        сжатое с боков, покрыто крупной чешуёй. Взрослые особи белого амура питаются
        преимущественно высшей растительностью.
    </section>
    <section>
        <h3  class="content-heading">Приготовление</h3>
        Отлично подходит для приготовления диетических блюд. При запекании нужно добавлять
        масло, а при жарке нарезать толстыми стейками, т.к. рыба сама по себе сухая.
    </section>
</article>`,
            `		<article>
    <h2  class="content-heading">Щука</h2>
    <img class="content-img" alt="pike on grass" src="./img/pike.jpg" />
    <section>
        <h3  class="content-heading">Общее описание рыбы</h3>
        Живёт обычно в прибрежной зоне, в водных зарослях, в непроточных или слабопроточных
        водах. Тело торпедовидное, голова большая, пасть широкая. Основу питания щуки
        составляют представители различных видов мелких рыб.
    </section>
    <section>
        <h3  class="content-heading">Приготовление</h3>
        Обычно рыба имеет сильный привкус, который не всем по вкусу. Что избавиться от него
        лучше запекать или тушить.
    </section>
</article>`,
            `
    <article>
        <h2  class="content-heading">Сом</h2>
        <img class="content-img" src="./img/catfish.jpg" alt="catfish">
        <section>
            <h3  class="content-heading">Общее описание рыбы</h3>
            Обитает в реках и озёрах. В передней части тело речного сома имеет округлые формы, а
            с продвижением к хвосту становится сжатым с обоих боков и переходит в сильный хвост.
        </section>
        <section>
            <h3  class="content-heading">Приготовление</h3>
            Умеренно жирная рыба. Из-за толстой кожи, можно готовить как угодно и на гриле со
            сгоревшей в уголь кожей тоже норм, т.к. её далеко не все едят.
        </section>
    </article>`,
            `		<article>
    <h2  class="content-heading">Карась</h2>
    <a title="jag asså, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Carassius_carassius_1.jpg"><img class="content-img" alt="Carassius carassius 1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Carassius_carassius_1.jpg/512px-Carassius_carassius_1.jpg"></a>
    <section>
        <h3  class="content-heading">Общее описание рыбы</h3>
        Питаются растительностью, мелкими беспозвоночными, зоопланктоном, зообентосом и
        детритом. Обитают исключительно в болотистых и низменных озёрах и реках. Спинной
        плавник длинный, глоточные зубы однорядные. Тело высокое с толстой спиной, умеренно
        сжатое с боков. Чешуя крупная и гладкая на ощупь.
    </section>
    <section>
        <h3  class="content-heading">Приготовление</h3>
        Имеет сильный приятный сладковатый вкус и ооочень много костей. В домашних условия
        подают обычно жареным с крестообразными надрезами. Также очень вкусный получается
        запеченый с майонезом, сметаной и зеленью.
    </section>
</article>`,
        ];
        const cashedArticles = [];

        ["carp", "grassCarp", "pike", "catfish", "carassius"].forEach(
            (fishName, i) => {
                const contentContainer = document.createElement("div");
                contentContainer.classList.add(fishName, "content");
                contentContainer.insertAdjacentHTML("afterbegin", articles[i]);
                cashedArticles.push({
                    fishName,
                    content: contentContainer,
                });
            }
        );
        return cashedArticles;
    };

    const contentArticles = initializeContentArray();

    const main = document.querySelector(".main");
    const temporaryFragment = document.createDocumentFragment();
    contentArticles.forEach((item) => {
        temporaryFragment.appendChild(item.content);
    });
    main.appendChild(temporaryFragment);

    const navClickHandle = ({ target }) => {
        if (target.tagName === "INPUT") {
            contentArticles.forEach((fish) =>
                fish.content.classList.remove("visible-content")
            );
            contentArticles
                .find((fish) => fish.fishName === target.id)
                .content.classList.add("visible-content");
        }
    };

    const navMenu = document.querySelector(".nav-menu");
    navMenu.addEventListener("click", navClickHandle);

    const initRadio = document.querySelector(".nav-radio");

    if (initRadio) {
        initRadio.click();
    }
};

