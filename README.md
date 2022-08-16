[![MIT Licensed][icon-mit]][license]
[![Kottans-Frontend][icon-kottans]][kottans-frontend]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Telegram][icon-chat]][chat]

# Frontend 2022 course homeworks

Цей репозиторій було створено для того, щоб студенти могли надсилати свої домашні завдання для перевірки.

Виконайте наведені нижче інструкції, щоб надіслати код на розгляд.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Зміст**

- [Огляд contribution flow](#%D0%BE%D0%B3%D0%BB%D1%8F%D0%B4-contribution-flow)
- [Словарик](#%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D0%B8%D0%BA)
- [Contribution stage A. Налаштування форку і локального клону](#contribution-stage-a-%D0%BD%D0%B0%D0%BB%D0%B0%D1%88%D1%82%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F-%D1%84%D0%BE%D1%80%D0%BA%D1%83-%D1%96-%D0%BB%D0%BE%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BA%D0%BB%D0%BE%D0%BD%D1%83)
- [Contribution stage B. Додавання нового коду та оновлення submissions](#contribution-stage-b-%D0%B4%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F-%D0%BD%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE-%D0%BA%D0%BE%D0%B4%D1%83-%D1%82%D0%B0-%D0%BE%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F-submissions)
  - [B1. Відправка коду нового завдання (app).](#b1-%D0%B2%D1%96%D0%B4%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D0%B0-%D0%BA%D0%BE%D0%B4%D1%83-%D0%BD%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE-%D0%B7%D0%B0%D0%B2%D0%B4%D0%B0%D0%BD%D0%BD%D1%8F-app)
  - [B2. Коли потрібні будь-які зміни](#b2-%D0%BA%D0%BE%D0%BB%D0%B8-%D0%BF%D0%BE%D1%82%D1%80%D1%96%D0%B1%D0%BD%D1%96-%D0%B1%D1%83%D0%B4%D1%8C-%D1%8F%D0%BA%D1%96-%D0%B7%D0%BC%D1%96%D0%BD%D0%B8)
  - [B3. Коли всі ваші PR нарешті будуть вмержені](#b3-%D0%BA%D0%BE%D0%BB%D0%B8-%D0%B2%D1%81%D1%96-%D0%B2%D0%B0%D1%88%D1%96-pr-%D0%BD%D0%B0%D1%80%D0%B5%D1%88%D1%82%D1%96-%D0%B1%D1%83%D0%B4%D1%83%D1%82%D1%8C-%D0%B2%D0%BC%D0%B5%D1%80%D0%B6%D0%B5%D0%BD%D1%96)
- [FAQ](#faq)
- [Довідкові матеріали та усунення проблем](#%D0%B4%D0%BE%D0%B2%D1%96%D0%B4%D0%BA%D0%BE%D0%B2%D1%96-%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D1%96%D0%B0%D0%BB%D0%B8-%D1%82%D0%B0-%D1%83%D1%81%D1%83%D0%BD%D0%B5%D0%BD%D0%BD%D1%8F-%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- *generated with [DocToc](https://github.com/thlorenz/doctoc)* -->

## Огляд contribution flow

Тепер ви є учасником освітнього проекту з відкритим кодом.

[Ці слайди](https://docs.google.com/presentation/d/13dati5gvA5f_hQFgxJPhPicjF5CRKu1e75RSsahmEaU/edit#slide=id.g58afea5148_0_0)
візуалізують contribution workflow.

Наведені нижче інструкції проведуть вас через contribution workflow - 
так ви будете публікувати код своїх завдань.

## Словарик

| Термін                 | Визначення                                                                                        |
|------------------------|---------------------------------------------------------------------------------------------------|
| repo                   | скорочення від "репозиторій"                                                                      |
| _homeworks main repo_  | Kottans FE репозиторій домашніх завдань курсу: https://github.com/kottans/frontend-2022-homeworks | 
| _homeworks fork_       | ваш власний форк головної репи домашніх завдань                                                   |
| _homeworks local repo_ | ваш локальний клон форку домашнього завдання                                                      |
| _app_                  | програма (або веб-сторінка), яку ви розробляєте для виконання конкретного завдання в курсі        |
| _app repo_             | репозиторій, який містить код вашої програми                                                      |

## Contribution stage A. Налаштування форку і локального клону

Зробити це потрібно лише один раз.

A1. Форкніть основне репо _homeworks_ через веб-інтерфейс GitHub

A2. Клонуйте _homeworks fork_ на вашій локальній машині:
   - `git clone https://github.com/<your-username>/frontend-2022-homeworks.git`

> Перед будь-якими подальшими операціями переконайтеся, що ви перебуваєте в каталозі локального repo homeworks

A3. Додайте _homeworks main repo_ як upstream:
   - `git remote add upstream https://github.com/kottans/frontend-2022-homeworks.git`

A4. У _homeworks local repo_ додайте папку зі своїм іменем користувача github до каталогу `submissions`

Ви додаватимете код із кожного завдання (app) в його окремий каталог під
ваш іменований каталог. Отже, структура файлу буде схожа на наступну
(у цьому прикладі `amashoshyna` - це ім'я користувача, а `js-dom` - назва завдання)

![File structure example](img/file-structure.png)

## Contribution stage B. Додавання нового коду та оновлення submissions

### B1. Відправка коду нового завдання (app).

> ВАЖЛИВІ речі, про які слід завжди пам’ятати.
>
> 1. Не робіть коміти у `main`.
>
> 2. `checkout main` перед створенням нової гілки, тобто не створюйте нову гілку, поки ви
> на будь-якій гілці яка не `main`.
>
> 3. Не мержіть свої гілки в `main`. Ви можете змержити `main` у свою гілку, якщо ви
> усвідомте, навіщо вам це потрібно. У поточному робочому процесі вам зазвичай це не потрібно.
>
> І не панікуйте, якщо під час переходу між гілками якийсь код зник.
> Він стане доступним для вас, коли ви повернетеся до певної гілки.
> Суть полягає в тому, щоб подавати завдання ізольовано одне від одного.

B11. Переконайтеся, що app, який ви розробляєте для виконання завдання:

(a) має власний спеціальний проект/репозиторій на GitHub (_app repo_)

(b) [опубліковано на GitHub pages](./publish-your-app.md)

B12. In your _homeworks local repo_ do the following:

B121. Синхронізуйте `main` гілку вашого _homeworks local repo_ та _homeworks fork_ (`origin`)
з гілкою `main` _homeworks main repo_ (`upstream`):
 - `git checkout main`
 - `git pull upstream main`
 - `git push origin main`
  
> На той момент у вас вже може бути код у іншій гілці завдань
> і може здатися, що його вже немає. Не хвилюйтеся, він все ще доступний на
> власній гілкці завдань. Немає необхідності об’єднувати цю гілку в `main`,
> і не мержіть його в `main`, оскільки це, швидше за все, призведе до конфліктів коду.

B122. Створіть спеціальну гілку для вашої нової кодової бази завдань (app), перебуваючи на `main`:
  - `git checkout main`
  - `git branch <task-branch-name>` (`<task-branch-name>` can be e.g. `dom-api-task`)
   
B123. Додайте необхідні файли:
 - `git checkout <task-branch-name>`
 - створіть каталог для бази коду вашого завдання (app) у розділі `./submissions/YOUR_USERNAME`, щоб
    шлях до вашого завдання був – `./submissions/YOUR_USERNAME/TASK_NAME`
   (перегляньте знімок екрана вище для прикладу структури, яку ви очікуєте)
 - копіювати файли з вашого _app repo_, ті і тільки ті, які потрібні для перевірки

> **ВАЖЛИВО!** Додайте лише файли/код, необхідні для перевірки, наприклад файли `html`, `css`, `js` тощо.
> Зображення, значки, каталоги IDE, такі як `.idea`, `.vscode` тощо - **не потрібні** для перевірки коду.
> **Ніколи** не використовуйте `.git` у своїх завданнях які надсилаєте.
> Скопіюйте потрібні файли **по одному**. **Ніколи не копіюйте папки** масово, оскільки це може спричинити за собою
> копіювання небажаних файлів і **прихованих папок**.

 - помістіть на стейдж файли за допомогою команди `git add` і закомітьте зміни

B124. Відкрийте Pull Request (PR):
 - запуште до _homeworks fork_: `git push --set-upstream origin <task-branch-name>`
 - зачекайте, доки операція push завершиться успішно
 - перейдіть до вашого _homeworks fork_ на GitHub
 - GitHub запропонує відкрити Pull Request із вашої нової гілки, просто зробіть це

![github-pr-opening](./img/github-pr-opening.png)
 
 - вам буде запропоновано PR шаблон повідомлення з інструкцією; прочитайте їх і заповніть, як це передбачено
 - коли PR відкрито, перевірте **Файли змінено**, щоб побачити, що надсилається
> Переконайтеся, що ваш PR **не містить жодних непов’язаних файлів або комітів** від будь-яких інших завдань,
> і жодні файли з інших ваших завдань або від інших авторів не видаляються

B125. Попросити рев'ю:
 - опублікуйте посилання на свій PR у
   [FE Questionarium chat](https://t.me/joinchat/DmX0JAl-mh5W0jrWli8Ycw)
   і попросіть наставників і колег про перевірку коду
 - відслідковувати запити на можливі зміни

### B2. Коли потрібні будь-які зміни

Щоразу, коли ви хочете або вам буде запропоновано внести будь-які зміни, виконайте такі дії:

B21. Оновіть свою програму (у відповідному _app repo_):
 - впровадити зміни
 - переконайтеся, що публікація вашої програми оновлена
 
B22. Оновіть свій PR - у вашому _homeworks local repo_:
 - `git checkout <task-branch-name>`
 - скопіюйте змінені файли (один за одним) у ваш каталог завдань із _app repo_
 - stage, commit і push

Ваш PR буде оновлено автоматично.

B23. Перевірте свій PR і повідомте ментора:
 - перейдіть до свого PR у _homeworks main repo_
 - перевірте надіслані файли в розділі **Файли змінено**;
   ви повинні побачити свої останні зміни у файлах
 - клацніть **Re-request review** у списку ваших PR-рев'юерів щоб
   привернути увагу наставників, щоб вони знали, що є нові зміни для перегляду

> Коли ваш PR буде нарешті змержено, напишіть міркування про завдання
> і досвід код рев'ю до вашого щоденника студента (ваш repo `kottans-frontend`):
> - _що для вас було нового_
> - _що вас здивувало_
> - _що ви збираєтеся використовувати в майбутньому_

### B3. Коли всі ваші PR нарешті будуть вмержені

Оновіть _homeworks local clone_ та _homeworks fork_, щоб мати весь свій код
у `main`:
 - `git checkout main`
 - `git pull upstream main`
 - `git push origin main` 

## FAQ

**Q1: Я зробив(ла) частину домашок в рамках попереднього курсу або р2р.
Мені їх зарахують?**

A1: Щоб це сталося, треба зробити наступне:

Для всіх PR, які не вмерджено - подай код на рев'ю, як описано
в цьому документі.

Для PR, які було вмерджено в інших репо:

1. Знайди всі вмерджені PR в інших репо, які треба зарахувати, і май лінки на них під рукою.
1. Відкрий issue в цьому репо скориставшись
   [шаблоном](https://github.com/kottans/frontend-2022-homeworks/issues/new?template=import-tasks-from-another-repo.md&title=your-github-username:%20Import%20tasks%20from%20another%20homeworks%20repo)
1. В студентському чаті закинь лінк на issue і попроси менторів врахувати вже раніше прийняті задачі.
1. Ментори перевірять статус залінкованих PR і навісять відповідні лейбли.
1. Через деякий час в [статі цього репо](./stats/pr-stats.md) з'являться відповідні записи.


## Довідкові матеріали та усунення проблем

1. [Contribution guide for beginners](https://gist.github.com/OleksiyRudenko/236c3046fbba028e0555fa847dae7001).
1. Зверніться до [цього посібнику з усунення проблем](https://gist.github.com/OleksiyRudenko/8b3ddb664308de0634b53c525e551d8b)
   щоразу, коли ви стикаєтеся з будь-якими конфліктами під час оновлення `main` з upstream (оригінальне репо)
   або маєте непов’язані файли чи коміти у своїх pull requests
1. Є проблеми? Запитайте у спільноти. У багатьох інших були подібні проблеми, спільнота допоможе вам

[icon-mit]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/OleksiyRudenko/a-tiny-JS-world/blob/master/LICENSE.md
[icon-chat]: https://img.shields.io/badge/chat-on%20telegram-blue.svg
[icon-kottans]: https://img.shields.io/badge/%3D(%5E.%5E)%3D-frontend-yellow.svg
[kottans-frontend]: https://github.com/kottans/frontend
[chat]: https://t.me/joinchat/DmX0JAl-mh5W0jrWli8Ycw
