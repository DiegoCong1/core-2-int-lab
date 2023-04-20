// Your data URL
const url = 'https://data.cityofnewyork.us/resource/9hxz-c2kj.json'

let localData = [] // Set up an empty object for our local data (`let` because it will change)
let violations = {} // violations object

// Do something with the data!
function parseData(data){
	// Go through each item in the object
	// Setup unique list of violations
	console.log(data);
	violations = {} // reset violations object
	data.forEach(record => {
		if ( record.violationdescription ){
			//take a log of unique violations
			if( record.code in violations){
				//code is already registered
				violations[ record.code ].count ++;
			}else{
				//a new violation
				if ( record.code ){
					violations[ record.code ] = {
						description: record.violationdescription,
						count: 1,
					}
				}				
			}
		}else{
			//no violations
		}
		
	});

	return violations;
}

function displayData(violations){
	console.log(violations);

	const container = document.getElementById('records');
	let html = '';
	
	//get max count of all violations
	let arr = Object.keys(violations).map( code =>{
		return violations[code].count;
	});
	let max = Math.max(...arr);
	console.log(max);

	for(const code in violations ){
		let item = violations[code]; // get violation object
		//get ratio for comparison
		let ratio = item.count/max //divide by the largest number to get a percentage
		html+=`<div class="record" style="--ratio:${ratio}">${item.description}(${item.count})</div>`
	};

	container.innerHTML = html;
}

function setupFilters(){
	let options = document.querySelectorAll('.filter');
	options.forEach( option=>{
		option.addEventListener('click', function(){
			let borough = option.innerText;
			// console.log(borough);
			if( borough == 'All'){
				displayData( parseData(localData) );
			}else{
				filterData( borough );
			}
			
		});
	})
}
function filterData( borough ){
	let filtered = localData.filter(row => row.borough == borough);
	// console.log(filtered);
	displayData( parseData(filtered) );
}

// Go get the data!
fetch(url+'?$limit=50000&$$app_token=zrG9tvjwzhg2m1OrlcFb5z0cl')
	.then(response => response.json())
	.then(data => {
		localData = data // Save the data to our local variable, so we don’t have to re-request
		displayData( parseData(localData) ) //parse, thhen display data
		setupFilters()
	});
