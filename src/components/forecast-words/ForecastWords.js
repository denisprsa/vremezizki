import React from 'react';
import PropTypes from 'prop-types';
import WidgetText from '../widgets/Text';
import WidgetTitle from '../widgets/Title';

import './ForecastWords.scss';
import Space from '../widgets/Space';

class ForecastWords extends React.Component {
    componentDidMount() {
        
    }
      
    componentWillUnmount() {

    }

    render() {
        let forecastForSlovenia = ['Nalagam ...'];
        let forecastNeighborCountry = ['Nalagam ...'];
        let weatherImage = ['Nalagam ...'];
        let outlook = ['Nalagam ...'];

        if (this.props && this.props.data.loading === false) {
            forecastForSlovenia = this.props.data.forecastText;
            forecastNeighborCountry = this.props.data.forecastNeighborCountry;
            weatherImage = this.props.data.weatherImage;
            outlook = this.props.data.outlook;
        }

        let titles = ['Napoved za Slovenijo', 'Napoved za sosednje pokrajine', 'Vremenska slika', 'Obeti'];

        let forecast = [forecastForSlovenia, forecastNeighborCountry, weatherImage, outlook].map((value, index) => {
            let text = value.map((val1, ind1) => {
                if (Array.isArray(val1)) {
                    return val1.map((val2, ind2) => <WidgetText text={val2} key={`text-forecast-${index}-${ind1}-${ind2}`} />);
                }

                return <WidgetText text={val1} key={`text-forecast-${index}-${ind1}`} />
            });

            return <div key={`title-forecast-${index}`}>
                <WidgetTitle className={index > 0 ? 'up-20': ''} title={titles[index]} />
                {text}
            </div>
        });

        return (
            <div className="forecast-words">
                {forecast}

                <Space height={15} />
                <div>
                    Vir: ARSO
                </div>
            </div>
        );
    }
}

ForecastWords.propTypes = {
    data: PropTypes.object
}

export default ForecastWords;
