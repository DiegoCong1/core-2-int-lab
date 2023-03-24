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
      <div class="artist"><span class="label">Artist</span> ${item.Artist}</div>
      <div class="title">${item.Title}</div>
      <div class="time">${item.Time}</div>
      <div class="description">${item.Description}</div>
      <div class="curator-note">${item['Curator note']}</div>
      <div class="location">${item.Location}</div>
      <div class="gallery-curator">${item['Gallery Curator']}</div>`;
    container.appendChild(newItem);    
  });
}

sayHello();

//window.addEventListener("scroll", function() {
 //var scrollPosition = window.pageXOffset;
 //var dimValue = (scrollPosition / window.innerHeight) * 100;
 //document.body.style.backgroundColor = "rgba(0, 0, 0, " + (dimValue/100) + ")";
//});
