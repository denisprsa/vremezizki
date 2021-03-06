
export function GetWeatherDataChartData(date) {
    let link = 'https://vremezizki.si/sqlZahteve/current-weather.php';

    if (date) {
        link += `?date=${date.toISOString()}`
    }

    return fetch(link, { mode: 'cors' })
        .then((value) => {
            if (value.status === 200) {
                return value.json();
            }

            console.log(value);
            throw new Error('Not 200 error');
        });
}