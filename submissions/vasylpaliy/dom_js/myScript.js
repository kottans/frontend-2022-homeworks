var sideMenu = document.getElementsByClassName("menu-text");
var mainContent = document.getElementsByClassName("main");

//sideMenu has same length as mainContent
//
function changeContent (regionName,regName) {
  for(let i in mainContent){
    mainContent[i].classList.remove("active");
    mainContent[regionName].classList.add("active");
    sideMenu[i].classList.remove("selectedRegion");
    sideMenu[regName].classList.add("selectedRegion");
  } 
 
}

  
 



  