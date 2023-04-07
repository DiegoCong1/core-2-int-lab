
let placeholder = document.querySelector("#token-data");

fetch('token-simple.json')
    .then(response => response.json())
    .then(json =>
        document.body.appendChild(document.createElement('pre')).innerHTML = JSON.stringify(json, null, 4));
 

    
    // Printing a single value
    
     
     

