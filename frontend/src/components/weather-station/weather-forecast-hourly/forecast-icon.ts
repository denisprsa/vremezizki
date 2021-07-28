
function getForecastRootPath(icon: string): string {
  return `assets/forecast-icons/${icon}`;
}

export default function GetForecastIcon(weatherType: string): string | undefined {
  switch (weatherType) {
    case 'clear_day':
      return getForecastRootPath('clear-day.svg');
    case 'clear_night':
      return getForecastRootPath('clear-night.svg');
    case 'clear_lightFG_day':
      console.log(weatherType);
      return undefined;
    case 'clear_lightFG_night':
      console.log(weatherType);
      return undefined;

      // Partly cloudy
    case 'partCloudy_day':
      return getForecastRootPath('partly-cloudy-day.svg');
    case 'partCloudy_night':
      return getForecastRootPath('partly-cloudy-night.svg');
    case 'partCloudy_lightRA_day':
      return getForecastRootPath('partly-cloudy-light-rain-day.svg');
    case 'partCloudy_lightRA_night':
      return getForecastRootPath('partly-cloudy-light-rain-night.svg');
    case 'partCloudy_lightFG_day':
      console.log(weatherType);
      return undefined;
    case 'partCloudy_lightFG_night':
      console.log(weatherType);
      return undefined;
    case 'partCloudy_lightTSRA_day':
      console.log(weatherType);
      return undefined;
    case 'partCloudy_lightTSRA_night':
      console.log(weatherType);
      return undefined;
    case 'partCloudy_modTSRA_day':
      console.log(weatherType);
      return undefined;
    case 'partCloudy_modTSRA_night':
      console.log(weatherType);
      return undefined;
    case 'partCloudy_modRA_day':
      return getForecastRootPath('partly-cloudy-moderate-rain-day.svg');
    case 'partCloudy_modRA_night':
      return getForecastRootPath('partly-cloudy-moderate-rain-night.svg');

      // Overcast
    case 'overcast_lightFG_day':
    case 'overcast_lightFG_night':
      return getForecastRootPath('cloudy-light-fog.svg');
    case 'overcast_modFG_day':
    case 'overcast_modFG_night':
      return getForecastRootPath('cloudy-moderate-fog.svg');
    case 'overcast_day':
    case 'overcast_night':
      return getForecastRootPath('cloudy.svg');
    case 'overcast_lightTSRA_day':
    case 'overcast_lightTSRA_night':
      return getForecastRootPath('cloudy-light-thunderstorm-rain.svg');
    case 'overcast_lightRA_day':
    case 'overcast_lightRA_night':
      return getForecastRootPath('cloudy-light-rain.svg');
    case 'overcast_modTS_night':
    case 'overcast_modTS_day':
      return getForecastRootPath('cloudy-moderate-thunderstorm.svg');
    case 'overcast_modTSRA_night':
    case 'overcast_modTSRA_day':
      return getForecastRootPath('cloudy-moderate-thunderstorm-rain.svg');
    case 'overcast_modRA_day':
    case 'overcast_modRA_night':
      return getForecastRootPath('cloudy-moderate-rain.svg');
    case 'overcast_lightRASN_night':
    case 'overcast_lightRASN_day':
      return getForecastRootPath('cloudy-light-snow-rain.svg');
    case 'overcast_lightSN_night':
    case 'overcast_lightSN_day':
      return getForecastRootPath('cloudy-light-snow.svg');
    case 'overcast_modRASN_day':
    case 'overcast_modRASN_night':
      return getForecastRootPath('cloudy-moderate-snow-rain.svg');
    case 'overcast_modSN_night':
    case 'overcast_modSN_day':
      return getForecastRootPath('cloudy-light-fog.svg');
    case 'overcast_heavyRA_day':
    case 'overcast_heavyRA_night':
      console.log(weatherType);
      return undefined;
    case 'overcast_heavySN_day':
    case 'overcast_heavySN_night':
      console.log(weatherType);
      return undefined;
    case 'overcast_heavyRASN_day':
    case 'overcast_heavyRASN_night':
      console.log(weatherType);
      return undefined;
    case 'overcast_heavyTSRA_day':
    case 'overcast_heavyTSRA_night':
      console.log(weatherType);
      return undefined;

      // Prev cloudy
    case 'prevCloudy_day': 
      return getForecastRootPath('prev-cloudy-day.svg');
    case 'prevCloudy_night': 
      return getForecastRootPath('prev-cloudy-night.svg');
    case 'prevCloudy_lightRA_day': 
      return getForecastRootPath('prev-cloudy-light-rain-day.svg');
    case 'prevCloudy_lightRA_night':
      return getForecastRootPath('prev-cloudy-light-rain-night.svg');
    case 'prevCloudy_lightFG_day':
      return getForecastRootPath('prev-cloudy-light-fog-day.svg');
    case 'prevCloudy_lightFG_night':
      return getForecastRootPath('prev-cloudy-light-fog-night.svg');
    case 'prevCloudy_lightTSRA_day':
      return getForecastRootPath('prev-cloudy-light-thunderstorm-rain-day.svg');
    case 'prevCloudy_lightTSRA_night':
      return getForecastRootPath('prev-cloudy-light-thunderstorm-rain-night.svg');
    case 'prevCloudy_lightSN_night':
      return getForecastRootPath('prev-cloudy-light-snow-night.svg');
    case 'prevCloudy_lightSN_day':
      return getForecastRootPath('prev-cloudy-light-snow-day.svg');
    case 'prevCloudy_lightRASN_day':
      return getForecastRootPath('prev-cloudy-light-snow-rain-day.svg');
    case 'prevCloudy_lightRASN_night':
      return getForecastRootPath('prev-cloudy-light-snow-rain-night.svg');
    case 'prevCloudy_modSN_night':
      return getForecastRootPath('prev-cloudy-moderate-snow-night.svg');
    case 'prevCloudy_modSN_day':
      return getForecastRootPath('prev-cloudy-moderate-snow-dy.svg');
    case 'prevCloudy_modTS_day':
      return getForecastRootPath('prev-cloudy-moderate-thunderstorm-day.svg');
    case 'prevCloudy_modTS_night':
      return getForecastRootPath('prev-cloudy-moderate-thunderstorm-night.svg');
    case 'prevCloudy_modRA_day':
      return getForecastRootPath('prev-cloudy-moderate-rain-day.svg');
    case 'prevCloudy_modRA_night':
      return getForecastRootPath('prev-cloudy-moderate-rain-night.svg');
    case 'prevCloudy_modTSRA_day':
      return getForecastRootPath('prev-cloudy-moderate-thunderstorm-rain-day.svg');
    case 'prevCloudy_modTSRA_night':
      return getForecastRootPath('prev-cloudy-moderate-thunderstorm-rain-night.svg');
    case 'prevCloudy_modRASN_night':
      return getForecastRootPath('prev-cloudy-moderate-snow-rain-night.svg');
    case 'prevCloudy_modRASN_day':
      return getForecastRootPath('prev-cloudy-moderate-snow-rain-day.svg');


    default:
      console.log('not found', weatherType);
      return undefined;
  }
}