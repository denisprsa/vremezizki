export function GetWindDirection(degrees) {
    if (degrees >= 348.75 || degrees <=11.25) {
        return 'S';
    } else if (degrees > 11.25 && degrees <=33.75) {
        return 'SSV'
    } else if (degrees > 33.75 && degrees <=56.25) {
        return 'SV'
    } else if (degrees > 56.25 && degrees <=78.75) {
        return 'VSV'
    } else if (degrees > 78.75 && degrees <=101.25) {
        return 'V'
    } else if (degrees > 101.25 && degrees <=123.75) {
        return 'VJV'
    } else if (degrees > 123.75 && degrees <=146.25) {
        return 'JV'
    } else if (degrees > 146.25 && degrees <=168.75) {
        return 'JJV'
    } else if (degrees > 168.75 && degrees <=191.25) {
        return 'J'
    } else if (degrees > 191.25 && degrees <=213.75) {
        return 'JJZ'
    } else if (degrees > 213.75 && degrees <=236.25) {
        return 'JZ'
    } else if (degrees > 236.25 && degrees <=258.75) {
        return 'ZJZ'
    } else if (degrees > 258.75 && degrees <=281.25) {
        return 'Z'
    } else if (degrees > 281.25 && degrees <=303.75) {
        return 'ZSZ'
    } else if (degrees > 303.75 && degrees <=326.25) {
        return 'SZ'
    } else if (degrees > 326.25 && degrees <= 348.75) {
        return 'SSZ'
    }
}