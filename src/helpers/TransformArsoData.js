import GetMonthName from './MonthNames';

function getNameOfDay(date) {
    switch (date.getDay()) {
    case 0:
        return 'Nedelja';
    case 1:
        return 'Ponedeljek';
    case 2:
        return 'Torek';
    case 3:
        return 'Sreda';
    case 4:
        return 'Četertek';
    case 5:
        return 'Petek';
    case 6:
        return 'Sobota';
    default: 
        return String(date.getDay());
    }
}

export function TransformArsoData(data) {
    let days = [];
    let hours = [];
    let lastHourDateUsed = new Date();
    let prevDay = -1;
    let maxTemp = -100;
    let minTemp = 100;
    let numberOfHours = [];

    for (let hour of data.forecast1h.features[0].properties.days) {
        for (let timeline of hour.timeline) {
            lastHourDateUsed = new Date(timeline.valid);
            let temp = Number(timeline.t);
            if (temp > maxTemp) {
                maxTemp = temp;
            }
            if (temp < minTemp) {
                minTemp = temp;
            }


            if (prevDay !== lastHourDateUsed.getDate()) {
                prevDay = lastHourDateUsed.getDate();
                numberOfHours.push(0);
            }

            hours.push({
                hour: `${lastHourDateUsed.getHours()}:00`,
                weatherType: timeline.clouds_icon_wwsyn_icon,
                temperature: temp,
                temperaturePercentage: 0.3,
                wind: timeline.ff_val,
                windIntensity: timeline.ff_shortText,
                humidity: timeline.rh,
                rain: timeline.tp_acc,
                day: numberOfHours.length - 1,
                dayName: getNameOfDay(lastHourDateUsed)
            });
            
            numberOfHours[numberOfHours.length - 1]++;
        }
    }

    for (let hour of data.forecast3h.features[0].properties.days) {
        for (let timeline of hour.timeline) {
            let newLastHourDateUsed = new Date(timeline.valid);
            let temp = Number(timeline.t);
            if (temp > maxTemp) {
                maxTemp = temp;
            }
            if (temp < minTemp) {
                minTemp = temp;
            }
            if (newLastHourDateUsed > lastHourDateUsed) {
                lastHourDateUsed = newLastHourDateUsed;

                if (prevDay !== lastHourDateUsed.getDate()) {
                    prevDay = lastHourDateUsed.getDate();
                    numberOfHours.push(0);
                }

                hours.push({
                    hour: `${newLastHourDateUsed.getHours()}:00`,
                    weatherType: timeline.clouds_icon_wwsyn_icon,
                    temperature: temp,
                    temperaturePercentage: 0.3,
                    wind: timeline.ff_val,
                    windIntensity: timeline.ff_shortText,
                    humidity: timeline.rh,
                    rain: timeline.tp_acc,
                    day: numberOfHours.length - 1,
                    dayName: getNameOfDay(lastHourDateUsed)
                });

                
                numberOfHours[numberOfHours.length - 1]++;
            }
        }
    }

    for (let hour of data.forecast6h.features[0].properties.days) {
        for (let timeline of hour.timeline) {
            let newLastHourDateUsed = new Date(timeline.valid);
            let temp = Number(timeline.t);
            if (temp > maxTemp) {
                maxTemp = temp;
            }
            if (temp < minTemp) {
                minTemp = temp;
            }
            if (newLastHourDateUsed > lastHourDateUsed) {
                lastHourDateUsed = newLastHourDateUsed;

                if (prevDay !== lastHourDateUsed.getDate()) {
                    prevDay = lastHourDateUsed.getDate();
                    numberOfHours.push(0);
                }

                hours.push({
                    hour: `${newLastHourDateUsed.getHours()}:00`,
                    weatherType: timeline.clouds_icon_wwsyn_icon,
                    temperature: temp,
                    temperaturePercentage: 0.3,
                    wind: timeline.ff_val,
                    windIntensity: timeline.ff_shortText,
                    humidity: timeline.rh,
                    rain: timeline.tp_acc,
                    day: numberOfHours.length - 1,
                    dayName: getNameOfDay(lastHourDateUsed)
                });
                
                numberOfHours[numberOfHours.length - 1]++;
            }
        }
    }
    
    minTemp -= 1;
    maxTemp += 1;

    for (let hourData of hours) {
        let percentage = (hourData.temperature - minTemp) / (maxTemp - minTemp);
        hourData.temperaturePercentage = percentage;
    }

    for (let day of data.forecast24h.features[0].properties.days) {
        let date = new Date(day.date);
        let lenDays = days.length;
        days.push({
            weatherType: day.timeline[0].clouds_icon_wwsyn_icon,
            date: date.getDate() + ' ' + GetMonthName(date.getMonth()),
            nameDay: getNameOfDay(date),
            highTemperature: Number(day.timeline[0].txsyn),
            lowTemperature: Number(day.timeline[0].tnsyn),
            numberOfHours: numberOfHours[lenDays]
        });
    }

    return { days: days, hours: hours };
}
