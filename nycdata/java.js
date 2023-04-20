		
console.log('hello');

		fetch('https://data.cityofnewyork.us/resource/i4gi-tjb9.json?$limit=1000&$$app_token=j6eaPhMTnZbwwIHX2KajVYxVo')
			.then(response => response.json())
			.then(data => {
				console.log(data);
				const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
				const lastHourData = data.filter(item => {
					const dataAsOf = new Date(item.data_as_of);
					const dataAsOfTime = dataAsOf.getHours() + ':' + dataAsOf.getMinutes() + ':' + dataAsOf.getSeconds();
					const oneHourAgoTime = oneHourAgo.getHours() + ':' + oneHourAgo.getMinutes() + ':' + oneHourAgo.getSeconds();
					return item.speed && dataAsOfTime >= oneHourAgoTime;
				});


				const totalSpeed = lastHourData.reduce((acc, item) => acc + parseFloat(item.speed), 0);
				const averageSpeed = totalSpeed / lastHourData.length;
				const averageSpeedElement = document.getElementById('average-speed');

				averageSpeedElement.textContent = averageSpeed.toFixed(2);
				if (averageSpeed < 10) {
					averageSpeedElement.classList.add('red');
					console.log(`Color: red`);
				} else if (averageSpeed < 20) {
					averageSpeedElement.classList.add('orange');
					console.log(`Color: orange`);
				} else {
					averageSpeedElement.classList.add('green');
					console.log(`Color: green`);
				}
			})
			.catch(error => {
				console.log(error);
			});