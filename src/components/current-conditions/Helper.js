
export function GetGraphWidth(windowWidth) {
    if (windowWidth >= 1280) {
        return 170;
    } else if (windowWidth < 1280 && windowWidth > 768) {
        return 150
    }

    return 130;
}

export function GetGraphWidthForState(windowWidth, state) {
    if (windowWidth >= 1280 && state !== 0) {
        state = 0;
        return 170;
    } else if (windowWidth < 1280 && windowWidth > 768 && state !== 1) {
        state = 1;
        return 150;
    } else if (windowWidth <= 768 && state !== 2) {
        state = 2;
        return 130;
    }
}