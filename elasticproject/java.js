const scrollContainer = document.querySelector("body");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});


// console.log('hi!');

let container = document.getElementById("content");

fetch('describ.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    contentdisplay(data);
  })
  .catch(error => console.log(error));


function sayHello(){
  console.log('Hello');
}

function contentdisplay( data ){
  data.forEach( function(item, index){
    console.log(item, index);
    console.log(item['Artists Names']);
    let newItem = document.createElement("div");
    newItem.classList.add("icon");
    newItem.innerHTML = `
      <div class="artist"><span class="label">Artist </span> ${item.Artist}</div>
      <div class="title"><span class="label">Title </span>${item.Title}</div>
      <div class="time"><span class="label">Time </span>${item.Time}</div>
      <div class="location"><span class="label">Location </span>${item.Location}</div>
      <div class="gallery-curator"><span class="label">Gallery Curator </span>${item['Gallery Curator']}</div>
      <div class="curator-note"><span class="label">Curator's Note </span>${item['Curator note']}</div>
      <div class="description"><span class="label">Description </span>${item.Description}</div>`;


        // Add a click event listener to the icon element
    newItem.addEventListener("click", function() {
      // Get the description element within the icon
      let description = this.querySelector(".description");
      
      // Toggle the display of the description element
      if (description.style.display === "block") {
        description.style.display = "none";
      } else {
        description.style.display = "block";
      }
    });

    container.appendChild(newItem);    
  });
}

sayHello();

let timeoutId;
const hideDivsAfter = 8000; // milliseconds of inactivity before hiding divs

function hideSpecificDivs() {
  const divsToHide = document.querySelectorAll(".blocks");
  for (let i = 0; i < divsToHide.length; i++) {
    divsToHide[i].style.display = "none";
  }
}

function showSpecificDivs() {
  const divsToShow = document.querySelectorAll(".blocks");
  for (let i = 0; i < divsToShow.length; i++) {
    divsToShow[i].style.display = "block";
  }
  resetTimer();
}

function resetTimer() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(hideSpecificDivs, hideDivsAfter);
}

document.addEventListener("mousemove", showSpecificDivs);
document.addEventListener("keydown", showSpecificDivs);
document.addEventListener("click", showSpecificDivs);
document.addEventListener("scroll", showSpecificDivs);
resetTimer();


resetTimer();

let isDown = false;
let startX;
let scrollLeft;

document.addEventListener("mousedown", (e) => {
  if (e.button === 1) {
    isDown = true;
    startX = e.pageX - document.body.offsetLeft;
    scrollLeft = document.body.scrollLeft;
  }
});

document.addEventListener("mouseup", () => {
  isDown = false;
});

document.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - document.body.offsetLeft;
  const walk = (x - startX) * 2; // adjust scroll speed here
  document.body.scrollLeft = scrollLeft - walk;
});

document.addEventListener("mouseleave", () => {
  isDown = false;
});






//window.addEventListener("scroll", function() {
 //var scrollPosition = window.pageXOffset;
 //var dimValue = (scrollPosition / window.innerHeight) * 100;
 //document.body.style.backgroundColor = "rgba(0, 0, 0, " + (dimValue/100) + ")";
//});
