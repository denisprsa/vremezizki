
export default function GetMonthName(month) {
    switch (month) {
    case 0:
        return 'jan.';
    case 1:
        return 'feb.';
    case 2:
        return 'mar.';
    case 3:
        return 'apr.';
    case 4:
        return 'maj.';
    case 5:
        return 'jun.';
    case 6:
        return 'jul.';
    case 7:
        return 'avg.';
    case 8:
        return 'sep.';
    case 9:
        return 'okt.';
    case 10:
        return 'nov.';
    case 11:
        return 'dec.';
    default:
        return 'jan.';
    }
}
