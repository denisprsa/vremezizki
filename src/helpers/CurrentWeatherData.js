

export function GetGraphData(weatherData, addTodayEndDate = false) {
    let data = {
        temperature: [],
        dewPoint: [],
        humidity: [],
        windSpeed: [],
        windGust: [],
        windDirection: [],
        pressure: [],
        rain: [],
        date: []
    };
    let lastDate = new Date();
    let sumRain = 0;

    for (let item of weatherData) {
        data.temperature.push(item.tmp);
        data.dewPoint.push(item.ros);
        data.humidity.push(item.vla);
        data.windDirection.push(item.vetersm);
        data.windGust.push(item.vetersu);
        data.windSpeed.push(item.veter);
        data.pressure.push(item.tlak);
        sumRain += item.pad;
        data.rain.push(sumRain);

        data.date.push(new Date(item.dat * 1000));
    }

    if (addTodayEndDate) {
        lastDate.setMinutes(lastDate.getMinutes() + 1);
        data.date.push(lastDate);

        let endDayDate = new Date();
        endDayDate.setHours(23);
        endDayDate.setMinutes(59);
        endDayDate.setSeconds(59);
        data.date.push(endDayDate);
    }

    return data;
}

function SetValueByExpression(property1, property2, obj1, obj2, bigger) {
    if (bigger && obj1[property1] < obj2[property2]) {
        obj1[property1] = obj2[property2];
    } else if (!bigger && obj1[property1] > obj2[property2]) {
        obj1[property1] = obj2[property2];
    }
}

export function GetCurrentData(weatherData) {
    let currentData = {
        dateTime: 'Podatki manjkajo',
        currentTemp: 0,
        minTemp: 99,
        maxTemp: -99,
        currentDewPoint: 0,
        minDewPoint: 99,
        maxDewPoint: -99,
        currentHumidity: 0,
        minHumidity: 99,
        maxHumidity: 0,
        currentWindSpeed: 0,
        maxWindSpeed: 0,
        currentWindGust: 0,
        maxWindWindGust: 0,
        currentWindDirection: 0,
        averageWindDirection: 0,
        dayRain: 0,
        currentPressure: 0,
        minPressure: 2000,
        maxPressure: 0,
    };

    for (let item of weatherData) {
        let date = new Date(item.dat * 1000);
        let dateAge = new Date() - date;
        dateAge = Math.floor(dateAge / 1000);
        currentData.dateTime = dateAge;

        if (dateAge < 60) {
            currentData.dateTimeString = `${dateAge} s`;
        } else if (dateAge < 60 * 60) {
            currentData.dateTimeString = `${Math.floor(dateAge / 60)} min`;
        } else {
            currentData.dateTimeString = `${Math.floor(dateAge / 60 / 60)} h`;
        }

        currentData.currentTemp = item.tmp;
        SetValueByExpression('minTemp', 'tmp', currentData, item, false);
        SetValueByExpression('maxTemp', 'tmp', currentData, item, true);

        currentData.currentDewPoint = item.ros;
        SetValueByExpression('minDewPoint', 'ros', currentData, item, false);
        SetValueByExpression('maxDewPoint', 'ros', currentData, item, true);

        currentData.currentHumidity = item.vla;
        SetValueByExpression('minHumidity', 'vla', currentData, item, false);
        SetValueByExpression('maxHumidity', 'vla', currentData, item, true);

        currentData.currentWindSpeed = item.veter;
        SetValueByExpression('maxWindSpeed', 'veter', currentData, item, true);

        currentData.currentWindGust = item.vetersu;
        SetValueByExpression('maxWindWindGust', 'vetersu', currentData, item, true);

        currentData.currentWindDirection = item.vetersm;

        currentData.dayRain += item.pad;

        currentData.currentPressure = item.tlak;
        SetValueByExpression('minPressure', 'tlak', currentData, item, false);
        SetValueByExpression('maxPressure', 'tlak', currentData, item, true);
    }

    return currentData;
}

export function GetWeatherStationDashboardData(weatherData, addTodayEndDate) {
    let graphData = GetGraphData(weatherData, addTodayEndDate);
    let currentData = GetCurrentData(weatherData);

    return {
        graphData,
        currentData
    };
}