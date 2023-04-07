let placeholder = document.querySelector("#token-data");

fetch('token-simple-2.json')
    .then(response => response.json())
	.then (data => {
    // Converting JSON object to JS object
    var obj = data;
    // Define recursive function to print nested values
    function printValues(obj) {
        for(var i in obj) {
            if(obj[i] instanceof Object) {
                printValues(obj[i]);
            } else {
                document.write(obj[i] + "<br>");
            };
        }
    };
    
    // Printing all the values from the resulting object
    console.log(data)
    
    document.write("<hr>");
    
    // Printing a single value
    
    placeholder.innerHTML = printValues(obj)
    })