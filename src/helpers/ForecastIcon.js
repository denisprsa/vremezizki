// Clear
import ClearDayIcon from '../assets/forecast-icons/clear-day.svg';
import ClearNightIcon from '../assets/forecast-icons/clear-night.svg';

// Cloudy
import CloudyLightRainIcon from '../assets/forecast-icons/cloudy-light-rain.svg';
import CloudyModerateThunderStormRainIcon from '../assets/forecast-icons/cloudy-moderate-thunderstorm-rain.svg';
import CloudyLightThunderStormRainIcon from '../assets/forecast-icons/cloudy-light-thunderstorm-rain.svg';
import CloudyModerateRainIcon from '../assets/forecast-icons/cloudy-moderate-rain.svg';
import CloudyIcon from '../assets/forecast-icons/cloudy.svg';
import CloudyLightFogIcon from '../assets/forecast-icons/cloudy-light-fog.svg';
import CloudyModerateFogIcon from '../assets/forecast-icons/cloudy-moderate-fog.svg';
import CloudyModerateThunderstormIcon from '../assets/forecast-icons/cloudy-moderate-thunderstorm.svg';

// Partly cloudy
import PartlyCloudyDayIcon from '../assets/forecast-icons/partly-cloudy-day.svg';
import PartlyCloudyNightIcon from '../assets/forecast-icons/partly-cloudy-night.svg';
import PartlyCloudyLightRainDayIcon from '../assets/forecast-icons/partly-cloudy-light-rain-day.svg';
import PartlyCloudyLightRainNightIcon from '../assets/forecast-icons/partly-cloudy-light-rain-night.svg';
import PartlyCloudyModerateRainDayIcon from '../assets/forecast-icons/partly-cloudy-moderate-rain-day.svg';
import PartlyCloudyModerateRainNightIcon from '../assets/forecast-icons/partly-cloudy-moderate-rain-night.svg';


// Mostly cloudy
import PrevCloudyDayIcon from '../assets/forecast-icons/prev-cloudy-day.svg';
import PrevCloudyNightIcon from '../assets/forecast-icons/prev-cloudy-night.svg';
import PrevCloudyModerateThunderstormDay from '../assets/forecast-icons/prev-cloudy-moderate-thunderstorm-day.svg';
import PrevCloudyModerateThunderstormNight from '../assets/forecast-icons/prev-cloudy-moderate-thunderstorm-night.svg';
import PrevCloudyModerateRainDayIcon from '../assets/forecast-icons/prev-cloudy-moderate-rain-day.svg';
import PrevCloudyModerateRainNightIcon from '../assets/forecast-icons/prev-cloudy-moderate-rain-night.svg';
import PrevCloudyLightRainDayIcon from '../assets/forecast-icons/prev-cloudy-light-rain-day.svg';
import PrevCloudyLightRainNightIcon from '../assets/forecast-icons/prev-cloudy-light-rain-night.svg';
import PrevCloudyModerateThunderstormRainDayIcon from '../assets/forecast-icons/prev-cloudy-moderate-thunderstorm-rain-day.svg';
import PrevCloudyModerateThunderstormRainNightIcon from '../assets/forecast-icons/prev-cloudy-moderate-thunderstorm-rain-night.svg';
import PrevCloudyLightThunderstormRainDayIcon from '../assets/forecast-icons/prev-cloudy-light-thunderstorm-rain-day.svg';
import PrevCloudyLightThunderstormRainNightIcon from '../assets/forecast-icons/prev-cloudy-light-thunderstorm-rain-night.svg';
import PrevCloudyLightFogDayIcon from '../assets/forecast-icons/prev-cloudy-light-fog-day.svg';
import PrevCloudyLightFogNightIcon from '../assets/forecast-icons/prev-cloudy-light-fog-night.svg';

export default function GetIcon(weatherType) {

    switch (weatherType) {
    // Clear
    case 'clear_day':
        return ClearDayIcon;
    case 'clear_night':
        return ClearNightIcon;

    // Partly cloudy
    case 'partCloudy_day':
        return PartlyCloudyDayIcon;
    case 'partCloudy_night':
        return PartlyCloudyNightIcon;
    case 'partCloudy_lightRA_day':
        return PartlyCloudyLightRainDayIcon;
    case 'partCloudy_lightRA_night':
        return PartlyCloudyLightRainNightIcon;
    case 'partCloudy_modRA_day':
        return PartlyCloudyModerateRainDayIcon;
    case 'partCloudy_modRA_night':
        return PartlyCloudyModerateRainNightIcon;
    case 'partCloudy_lightFG_day':
        return undefined;
    case 'partCloudy_lightFG_night':
        return undefined;
    case 'partCloudy_lightTSRA_day':
        return undefined;
    case 'partCloudy_lightTSRA_night':
        return undefined;
    case 'partCloudy_modTSRA_day':
        return undefined;
    case 'partCloudy_modTSRA_night':
        return undefined;

    // Overcast
    case 'overcast_lightFG_day':
        return CloudyLightFogIcon;
    case 'overcast_lightFG_night':
        return CloudyLightFogIcon;
    case 'overcast_modFG_day':
        return CloudyModerateFogIcon;
    case 'overcast_modFG_night':
        return CloudyModerateFogIcon;
    case 'overcast_day':
        return CloudyIcon;
    case 'overcast_night':
        return CloudyIcon;
    case 'overcast_lightTSRA_day':
        return CloudyLightThunderStormRainIcon;
    case 'overcast_lightTSRA_night':
        return CloudyLightThunderStormRainIcon;
    case 'overcast_lightRA_day':
        return CloudyLightRainIcon;
    case 'overcast_lightRA_night':
        return CloudyLightRainIcon;
    case 'overcast_modTS_night':
        return CloudyModerateThunderstormIcon;
    case 'overcast_modTS_day':
        return CloudyModerateThunderstormIcon;
    case 'overcast_modTSRA_night':
        return CloudyModerateThunderStormRainIcon;
    case 'overcast_modTSRA_day':
        return CloudyModerateThunderStormRainIcon;
    case 'overcast_modRA_day':
        return CloudyModerateRainIcon;
    case 'overcast_modRA_night':
        return CloudyModerateRainIcon;
    case 'overcast_modRASN_day':
        return undefined;
    case 'overcast_modRASN_night':
        return undefined;
    case 'overcast_heavyRA_day':
        return undefined;
    case 'overcast_heavyRA_night':
        return undefined;
    case 'overcast_heavyTSRA_day':
        return undefined;
    case 'overcast_heavyTSRA_night':
        return undefined;

    // Prev cloudy
    case 'prevCloudy_day': 
        return PrevCloudyDayIcon;
    case 'prevCloudy_night': 
        return PrevCloudyNightIcon;
    case 'prevCloudy_lightRA_day': 
        return PrevCloudyLightRainDayIcon;
    case 'prevCloudy_lightRA_night':
        return PrevCloudyLightRainNightIcon;
    case 'prevCloudy_lightFG_day':
        return PrevCloudyLightFogDayIcon;
    case 'prevCloudy_lightFG_night':
        return PrevCloudyLightFogNightIcon;
    case 'prevCloudy_lightTSRA_day':
        return PrevCloudyLightThunderstormRainDayIcon;
    case 'prevCloudy_lightTSRA_night':
        return PrevCloudyLightThunderstormRainNightIcon;
    case 'prevCloudy_modTS_day':
        return PrevCloudyModerateThunderstormDay;
    case 'prevCloudy_modTS_night':
        return PrevCloudyModerateThunderstormNight;
    case 'prevCloudy_modRA_day':
        return PrevCloudyModerateRainDayIcon;
    case 'prevCloudy_modRA_night':
        return PrevCloudyModerateRainNightIcon;
    case 'prevCloudy_modTSRA_day':
        return PrevCloudyModerateThunderstormRainDayIcon;
    case 'prevCloudy_modTSRA_night':
        return PrevCloudyModerateThunderstormRainNightIcon;

    case 'snow':
        return ;
    default:
        console.log('not found', weatherType);
        return undefined;
    }
}
