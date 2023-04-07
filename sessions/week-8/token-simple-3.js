let placeholder = document.querySelector("#token-data");

fetch('token-simple.json')
    .then(response => response.json())
    .then(json =>
        const myObj = JSON.parse(json))
        document.getElementById("token-data").innerHTML = myObj;
 
