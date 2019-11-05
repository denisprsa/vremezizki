function transformData(data) {
    let forecastText = [];
    let forecastNeighborCountry = [];
    let weatherImage = [];
    let outlook = [];
    let warning = [];
    let forecastDate = data.fcast_si_text.articleinfo.pubdate;

    for (let item of data.fcast_si_text.section) {    
        if (item.title === 'NAPOVED ZA SLOVENIJO' && item.para) {
            forecastText.push(item.para);
        }
        
        if (item.title === 'NAPOVED ZA SOSEDNJE POKRAJINE' && item.para) {
            forecastNeighborCountry.push(item.para);
        }
        
        if (item.title === 'VREMENSKA SLIKA' && item.para) {
            weatherImage.push(item.para);
        }
        
        if (item.title === 'OBETI' && item.para) {
            outlook.push(item.para);
        }

        if (item.title === 'OPOZORILO' && item.para !== 'Dodatnega opozorila ni.') {
            warning.push(item.para);
        }
    }

    return {
        forecastText:  forecastText,
        forecastNeighborCountry: forecastNeighborCountry,
        weatherImage: weatherImage,
        outlook: outlook,
        warning: warning,
        forecastDate: forecastDate
    }; 
}

export default function GetWeatherForecastText(signal) {
    let link = 'https://vreme.arso.gov.si/api/1.0/nonlocation/?lang=sl';

    return fetch(link, { mode: 'cors', signal })
        .then((value) => {
            if (value.status === 200) {
                return value.json();
            }

            console.log(value);
            throw new Error('Not 200 error');
        })
        .then(data => {
            return transformData(data);
        });
}