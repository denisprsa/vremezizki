
export function GetCurrentTemperature() {
    let link = 'https://vremezizki.si/sqlZahteve/current-temperature.php';

    return fetch(link, { mode: 'cors' })
        .then((value) => {
            if (value.status === 200) {
                return value.json();
            }

            console.log(value);
            throw new Error('Not 200 error');
        });
}