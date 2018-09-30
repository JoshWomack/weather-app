let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?zip=35233&appid=50b57001e47a35c46af179f3104b097e', true);

xhr.onload =  function() {
    let response = JSON.parse(xhr.responseText);
    console.log(response);

    let city = response.city.name;
    document.body.innerHTML += `${city} 5 Day Forecast`;

    let allDays = [[],[],[],[],[]];   

    let dataForOutput = {
            day0: {},
            day1: {},
            day2: {},
            day3: {},
            day4: {} 
    }

    namesOfDays = {
        'Sunday': 0,
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6
    }

    response.list.forEach(function(day, index) {

        let arrayNum = Math.floor(index / 8);
        allDays[arrayNum].push(day);

    });

    allDays.forEach(function(days, index1) {
        let minTemps = [];
        let maxTemps = [];
        days.forEach(function(day, index2) {
            minTemps.push(day.main.temp_min);
            maxTemps.push(day.main.temp_max);
            if (index2 === 3) {
                date = new Date(day.dt * 1000);
                dataForOutput[`day${index1}`].dayOfMonth = date.getDate();
                dataForOutput[`day${index1}`].dayOfWeek = date.getDay();
                dataForOutput[`day${index1}`].month = date.getMonth();
                dataForOutput[`day${index1}`].weatherDescription = day.weather[0].main;
            }
        })
        let minTemp = ((Math.min(...minTemps) - 273.15) * 1.8 + 32).toFixed(0);
        let maxTemp = ((Math.max(...maxTemps) - 273.15) * 1.8 + 32).toFixed(0);
        dataForOutput[`day${index1}`].minTemp = minTemp;
        dataForOutput[`day${index1}`].maxTemp = maxTemp;
    });

    console.log(allDays);
    console.log(dataForOutput);

};

xhr.send();




