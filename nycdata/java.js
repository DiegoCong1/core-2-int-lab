const fetchData = () => {
	const ONE_DAY = 24 * 60 * 60 * 1000; // milliseconds in a day
	const now = new Date();
	const yesterday = new Date(now - ONE_DAY);
  	const yesterdayISO = toIsoString(yesterday);
  	console.log(yesterdayISO);

  function toIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          return (num < 10 ? '0' : '') + num;
      };

  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds())

    } 

  fetch(`https://data.cityofnewyork.us/resource/i4gi-tjb9.json?$where=data_as_of>'${yesterdayISO}'&$limit=5000&$$app_token=j6eaPhMTnZbwwIHX2KajVYxVo`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      let lastHourData = data.filter(item => {
        const dataAsOf = new Date(item.data_as_of);
        const dataAsOfTime = dataAsOf.getHours() + ':' + dataAsOf.getMinutes() + ':' + dataAsOf.getSeconds();
        const oneHourAgoTime = oneHourAgo.getHours() + ':' + oneHourAgo.getMinutes() + ':' + oneHourAgo.getSeconds();
        return parseFloat(item.speed) && dataAsOfTime >= oneHourAgoTime;

      });
      console.log('lasthour', lastHourData);

      const averageSpeedElement = document.getElementById('average-speed');

      const updateAverageSpeed = (data) => {
        const totalSpeed = data.reduce((acc, item) => acc + parseFloat(item.speed), 0);
        const averageSpeed = totalSpeed / data.length;
        console.log(data, totalSpeed, averageSpeed);
        averageSpeedElement.textContent = averageSpeed.toFixed(2);

        if (averageSpeed < 10) {
          averageSpeedElement.classList.add('red');
          averageSpeedElement.classList.remove('orange');
          averageSpeedElement.classList.remove('green');
          console.log(`Color: red`);
          document.querySelector('h1').style.fontStyle = 'normal';
        } else if (averageSpeed < 20) {
          averageSpeedElement.classList.add('orange');
          averageSpeedElement.classList.remove('red');
          averageSpeedElement.classList.remove('green');
          console.log(`Color: orange`);
          document.querySelector('h1').style.fontStyle = 'normal';
        } else if (averageSpeed > 20) {
          averageSpeedElement.classList.add('green');
          averageSpeedElement.classList.remove('red');
          averageSpeedElement.classList.remove('orange');
          console.log(`Color: green`);
          document.querySelector('h1').style.fontStyle = 'italic';
        }
      };

      updateAverageSpeed(data);


      const manhattanImg = document.querySelector('.manhattan');
      manhattanImg.addEventListener('click', () => {
        const manhattanData = data.filter(item => item.borough === 'Manhattan');
        updateAverageSpeed(manhattanData);
      });

      const bronxImg = document.querySelector('.bronx');
      bronxImg.addEventListener('click', () => {
        const bronxData = data.filter(item => item.borough === 'Bronx');
        updateAverageSpeed(bronxData);
      });

      const statenImg = document.querySelector('.staten');
      statenImg.addEventListener('click', () => {
        const statenData = data.filter(item => item.borough === 'Staten Island');
        updateAverageSpeed(statenData);
      });

      const queensImg = document.querySelector('.queen');
      queensImg.addEventListener('click', () => {
        const queensData = data.filter(item => item.borough === 'Queens');
        updateAverageSpeed(queensData);
      });

      const brooklynImg = document.querySelector('.brooklyn');
      brooklynImg.addEventListener('click', () => {
        const brooklynData = data.filter(item => item.borough === 'Brooklyn');
        updateAverageSpeed(brooklynData);
      });

    })
    .catch(error => {
      console.log(error);
    });
};

fetchData();

  document.getElementById("refresh").addEventListener("click", function() {
    location.reload();

     });

$(document).ready(function() {
  $('.manhattan').click(function() {
    if ($(this).css('filter') == 'none') {
      $(this).css('filter', 'invert(94%) sepia(0%) saturate(3520%) hue-rotate(30deg) brightness(70%) contrast(61%)');
    } else {
      $(this).css('filter', 'none');
    }
  });
});


const pastButton = document.querySelector('.y2000');
pastButton.addEventListener('click', () => {
  const today2000 = new Date('2000-05-04');
  const today2000ISO = toIsoString(today2000);

  function toIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          return (num < 10 ? '0' : '') + num;
      };

  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds())

    } 

  const url = `https://data.cityofnewyork.us/resource/i4gi-tjb9.json?$where=data_as_of>'${today2000ISO}'&$limit=5000&$$app_token=j6eaPhMTnZbwwIHX2KajVYxVo`;
  
  fetchData(url)
    .then(data => {
      const todayData = data.filter(item => {
        const dataAsOf = new Date(item.data_as_of);
        return dataAsOf.toDateString() === today2000.toDateString();
      });
      console.log('today', todayData);

      updateAverageSpeed(todayData);
    });
});


