


let container = document.getElementById("content");

fetch('color.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    contentdisplay(data);
  })
  .catch(error => console.log(error));


  function contentdisplay( data ){
  data.forEach( function(item, index){
    console.log(item, index);
    console.log(item['name']);
    let newItem = document.createElement("div");
    newItem.classList.add('icon');
    newItem.innerHTML = `
      <div class="names"><span class="label">Name</span> ${item.name}</div>
      <div class="values"><span class="label">Value</span> ${item.value}</div>`;
      newItem.style.backgroundColor = item.value;
    container.appendChild(newItem); 
  });
}