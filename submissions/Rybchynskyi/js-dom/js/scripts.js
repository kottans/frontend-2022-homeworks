var select = document.querySelector(".item1").innerHTML;
console.log(select)
let progress = 0;
let progress_arr = [];
let dot_position = 180;
document.querySelector(".prog_title").innerHTML = "progress";


document.querySelector(".prog").innerHTML = progress + "%";

function showitem(n) {
    let message;
    switch (n) {
        case 1:
            message = document.querySelector(".item1").innerHTML;
            if(progress_arr.indexOf(n) == -1) {
                progress_arr.push(n);
                progress = progress + 25;
                dot_position = dot_position - 45;
            }
            console.log(progress_arr)
        break;

        case 2:
            message = document.querySelector(".item2").innerHTML;
            if(progress_arr.indexOf(n) == -1) {
                progress_arr.push(n);
                progress = progress + 25;
                dot_position = dot_position - 45;
            }
            console.log(progress_arr)
        break;

        case 3:
            message = document.querySelector(".item3").innerHTML;
            if(progress_arr.indexOf(n) == -1) {
                progress_arr.push(n);
                progress = progress + 25;
                dot_position = dot_position - 45;
            }
            console.log(progress_arr)
        break;

        case 4:
            message = document.querySelector(".item4").innerHTML;
            if(progress_arr.indexOf(n) == -1) {
                progress_arr.push(n);
                progress = progress + 25;
                dot_position = dot_position - 45;
            }
            console.log(progress_arr)
        break
    }
    document.getElementById("item").innerHTML = message
}

document.querySelector(".count").addEventListener("click", update)
function update () {
    if (progress<100) {
        document.querySelector(".prog").innerHTML = progress + "%";
        document.getElementsByClassName('loader_dot')[0].style.top = dot_position + "px";

    }
    else {
        document.querySelector(".prog").innerHTML = "100%";
        document.getElementsByClassName('loader_dot')[0].style.top = dot_position + "px";
        document.querySelector(".prog_title").innerHTML = "SUCESS!";
    }
}