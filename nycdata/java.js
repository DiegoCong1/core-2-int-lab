const fetchData = () => {
  const ONE_DAY = 24 * 60 * 60 * 1000; // milliseconds in a day
  const now = new Date();
  const yesterday = new Date(now - ONE_DAY);
  const yesterdayISO = yesterday.toISOString();

  fetch(`https://data.cityofnewyork.us/resource/i4gi-tjb9.json?data_as_of=2023-04-27T07:49:04.000&$limit=1000&$$app_token=j6eaPhMTnZbwwIHX2KajVYxVo`)
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

      const averageSpeedElement = document.getElementById('average-speed');

      const updateAverageSpeed = (data) => {
        const totalSpeed = data.reduce((acc, item) => acc + parseFloat(item.speed), 0);
        const averageSpeed = totalSpeed / data.length;
        averageSpeedElement.textContent = averageSpeed.toFixed(2);

        if (averageSpeed < 10) {
          averageSpeedElement.classList.add('red');
          averageSpeedElement.classList.remove('orange');
          averageSpeedElement.classList.remove('green');
          console.log(`Color: red`);
        } else if (averageSpeed < 20) {
          averageSpeedElement.classList.add('orange');
          averageSpeedElement.classList.remove('red');
          averageSpeedElement.classList.remove('green');
          console.log(`Color: orange`);
        } else {
          averageSpeedElement.classList.add('green');
          averageSpeedElement.classList.remove('red');
          averageSpeedElement.classList.remove('orange');
          console.log(`Color: green`);
        }
      };

      updateAverageSpeed(lastHourData);


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
