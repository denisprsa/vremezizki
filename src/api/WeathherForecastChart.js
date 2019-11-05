import { TransformArsoData } from '../helpers/TransformArsoData';

export default function GetWeatherForecastChart(signal) {
    let link = 'https://vreme.arso.gov.si/api/1.0/location/?lang=sl&location=Lendava';

    return fetch(link, { mode: 'cors' })
        .then((value) => {
            if (value.status === 200) {
                return value.json();
            }

            console.log(value);
            throw new Error('Not 200 error');
        })
        .then(data => {
            return TransformArsoData(data);
        });
}