'use strict'

import dataObj from "./base.js";

const title = document.querySelector('.title__chapter');
const description = document.querySelector('.description');
const nav_items = document.querySelectorAll('.nav__item');
const nav = document.querySelector('.nav');
const btn = document.querySelector('.btn');
const buttonsDiv = document.querySelector('.buttons');
const btn__home = document.querySelector('.home__btn');
const checkboxes = document.querySelectorAll('.checkbox');
const progressDig = document.querySelector('.progress__dig');
const progressLine = document.querySelector('.progress');

let currentTitle = title.textContent;
let progressMax = checkboxes.length;
 
// event listeners

nav.addEventListener("click", getCurrrentContent);
btn__home.addEventListener('click', goToHomePage);

// functions declaration

function getCurrrentContent(e) {
    nav_items.forEach(item => { item.classList.remove('selected')}); 
    let target = e.target;
    switch (target.tagName) {
        case "LI": 
        target.classList.add('selected');
        currentTitle = e.target.innerText;
        changePage(currentTitle);
        break; 

        case "A":
        target.parentElement.classList.add('selected'); 
        currentTitle = e.target.innerText;
        changePage(currentTitle);
        break; 

        case "INPUT":
        let currentProgress = 0;  
        checkboxes.forEach(item => { if (item.checked) { currentProgress++;}});
        progressDig.textContent = Math.floor((currentProgress / progressMax * 100)) + "%";
        progressLine.style.width = Math.floor((currentProgress / progressMax * 100)) + "%";  
        if (currentProgress == 3) {
            alert("Вітаннячка, котан! Го на Стейдж 1)))")
        }
        
        default:
        return;
    };
};

function changePage(currentTitle) {

const title = document.querySelector('.title__chapter');
const description = document.querySelector('.description');

let newTitle = document.createElement("h4");
newTitle.classList.add('title__chapter');
newTitle.textContent = currentTitle;
title.replaceWith(newTitle);

const newDesc = renderPage(currentTitle);
description.replaceWith(newDesc);

btn.classList.remove('btn');
btn.classList.add('hidden');
buttonsDiv.classList.remove('buttons');
buttonsDiv.classList.add('buttons__grid');
};

function renderPage(taskName) {
    const desc = document.createElement('div');
    desc.classList.add('description');
    const taskList = document.createElement("ol");
    taskList.classList.add('task');

    dataObj.filter(function(item) {
    return item.taskName == taskName;
})[0].taskExesice.forEach(item => {
    const listItem = document.createElement("li");
    listItem.classList.add("task__item");
    listItem.innerHTML = item;
    taskList.append(listItem);
});
    desc.append(taskList);
    return desc;
}

function goToHomePage() {
    nav_items.forEach(item => {
        item.classList.remove('selected');
    }); 
    changePage('Welcome to Kottans!');

    document.querySelector('.task__item').classList.add('default');
    btn.classList.remove('hidden');
    btn.classList.add('btn');
    buttonsDiv.classList.remove('buttons__grid');
    buttonsDiv.classList.add('buttons');
};
