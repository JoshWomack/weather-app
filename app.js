
let button = document.querySelector('.btn');
let zipInput = document.querySelector('#zip-input');
const dayTitles = document.querySelectorAll('.day-title');
const dayCardText = document.querySelectorAll('.card-text');
let zipCode = '35233';

getWeatherData();

button.addEventListener('click', function () {

    zipCode = zipInput.value;
    getWeatherData();
})



function getWeatherData() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=50b57001e47a35c46af179f3104b097e`, true);

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);

        let city = response.city.name;
        document.querySelector('h4').innerText = `Five Day Weather Forecast for ${city}`;

        let allDays = [[], [], [], [], []];

        let dataForOutput = {
            day0: {},
            day1: {},
            day2: {},
            day3: {},
            day4: {}
        }
    

        namesOfDays = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        }

        response.list.forEach(function (day, index) {

            let arrayNum = Math.floor(index / 8);
            allDays[arrayNum].push(day);

        });

        allDays.forEach(function (days, index1) {
            let minTemps = [];
            let maxTemps = [];
            days.forEach(function (day, index2) {
                minTemps.push(day.main.temp_min);
                maxTemps.push(day.main.temp_max);
            })

            date = new Date(days[3].dt * 1000);
            dataForOutput[`day${index1}`].dayOfMonth = date.getDate();
            dataForOutput[`day${index1}`].dayOfWeek = date.getDay();
            dataForOutput[`day${index1}`].month = date.getMonth();
            dataForOutput[`day${index1}`].weatherDescription = days[3].weather[0].main;

            let minTemp = ((Math.min(...minTemps) - 273.15) * 1.8 + 32).toFixed(0);
            let maxTemp = ((Math.max(...maxTemps) - 273.15) * 1.8 + 32).toFixed(0);
            dataForOutput[`day${index1}`].minTemp = minTemp;
            dataForOutput[`day${index1}`].maxTemp = maxTemp;
        })


        for (let day in dataForOutput) {
            dataForOutput[day].dayText = namesOfDays[dataForOutput[day].dayOfWeek];
        }

        for (i = 0; i < dayTitles.length; i++) {
            dayTitles[i].textContent = dataForOutput[`day${i}`].dayText;
            let tempHigh = dataForOutput[`day${i}`].maxTemp;
            let tempLow = dataForOutput[`day${i}`].minTemp;
            let weatherType = dataForOutput[`day${i}`].weatherDescription;
            dayCardText[i].innerHTML = `
            <p class='text-center text-capitalize font-weight-bold'>${weatherType}</p>
            <ul>
                <li>High: ${tempHigh} 	&degF</li>
                <li>Low:  ${tempLow} &degF</li> 
            </ul>
            `
        }

        console.log(dataForOutput);
    }

    xhr.send();
}







