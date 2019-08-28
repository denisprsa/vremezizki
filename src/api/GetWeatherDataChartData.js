
export function GetWeatherDataChartData() {
    let link = 'http://vremezizki.si/sqlZahteve/current-weather.php';

    return fetch(link, { mode: 'cors' })
        .then((value) => {
            if (value.status === 200) {
                return value.json();
            }

            console.log(value);
            throw new Error('Not 200 error');
        });
}