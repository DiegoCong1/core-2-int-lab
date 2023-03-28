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
    newItem.classList.add('icon', 'icon1', 'icon2', 'icon3', 'icon4', 'icon5');
    newItem.innerHTML = `
      <div class="names"><span class="label">Name</span> ${item.name}</div>
      <div class="values"><span class="label">Value</span> ${item.value}</div>
    container.appendChild(newItem)`; 
    container.appendChild(newItem);    

  });
}
