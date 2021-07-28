
const PI   = Math.PI,
  sin  = Math.sin,
  cos  = Math.cos,
  tan  = Math.tan,
  asin = Math.asin,
  atan = Math.atan2,
  acos = Math.acos,
  rad  = PI / 180;
const NEW = 0;
const FIRST = 1;
const FULL = 2;
const LAST = 3;
const PHASE_MASK = 3;
const SYNODIC_MONTH = 29.53058868;
const dayMs = 1000 * 60 * 60 * 24;
const J1970 = 2440588;
const J2000 = 2451545;

function toJulian(date: Date) {
  return date.valueOf() / dayMs - 0.5 + J1970;
}

function fromJulian(j: number)  {
  return new Date((j + 0.5 - J1970) * dayMs);
}

const e = rad * 23.4397; // obliquity of the Earth

function toRad(d: number) {
  return (Math.PI / 180.0) * d;
}

function dSin(d: number) {
  return sin(toRad(d));
}

function dCos (d: number) {
  return Math.cos(toRad(d));
}

function rightAscension(l: number, b: number) {
  return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
}

function declination(l: number, b: number) {
  return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
}

function azimuth(H: number, phi: number, dec: number)  {
  return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
}

function altitude(H: number, phi: number, dec: number) {
  return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
}

function siderealTime(d: number, lw: number) {
  return rad * (280.16 + 360.9856235 * d) - lw;
}

function astroRefraction(h: number) {
  if (h < 0) {
    h = 0;
  }

  return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
}

function solarMeanAnomaly(d: number) {
  return rad * (357.5291 + 0.98560028 * d);
}

function eclipticLongitude(M: number) {
  const C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M));
  const P = rad * 102.9372;

  return M + C + P + PI;
}

function toDays(date: Date)   {
  return toJulian(date) - J2000;
}

function sunCoords(d: number) {
  const M = solarMeanAnomaly(d);
  const L = eclipticLongitude(M);

  return {
    dec: declination(L, 0),
    ra: rightAscension(L, 0)
  };
}

function moonCoords(d: number) { 
  const L = rad * (218.316 + 13.176396 * d);
  const M = rad * (134.963 + 13.064993 * d);
  const F = rad * (93.272 + 13.229350 * d);

  const longitude  = L + rad * 6.289 * sin(M);
  const latitude  = rad * 5.128 * sin(F);
  const distanceToMoonKM = 385001 - 20905 * cos(M);

  return {
    ra: rightAscension(longitude, latitude),
    dec: declination(longitude, latitude),
    dist: distanceToMoonKM
  };
}

function hoursLater(date: Date, h: number) {
  return new Date(date.valueOf() + h * dayMs / 24);
}

function getMoonPosition(date: Date, lat: number, lng: number) {
  const lw  = rad * -lng;
  const phi = rad * lat;
  const d   = toDays(date);

  const c = moonCoords(d);
  const H = siderealTime(d, lw) - c.ra;
  let h = altitude(H, phi, c.dec);
  const pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

  h = h + astroRefraction(h); // altitude correction for refraction

  return {
    azimuth: azimuth(H, phi, c.dec),
    altitude: h,
    distance: c.dist,
    paralyticAngle: pa
  };
}

function meanPhase(sDate: number, k: number) {
// Time in Julian centuries from 1900 January 12 noon UTC
  const delta_t = (sDate - -2208945600000.0) / 86400000.0;
  const t = delta_t / 36525;

  return 2415020.75933 + SYNODIC_MONTH * k + (0.0001178 - 0.000000155 * t) * t * t + 0.00033 * dSin(166.56 + (132.87 - 0.009173 * t) * t);
}

function truePhase(k: number, tPhase: number) {
  tPhase = tPhase & PHASE_MASK;
  k = k + 0.25 * tPhase;

  const t = (1.0 / 1236.85) * k;

  let pt = 2415020.75933 +
    SYNODIC_MONTH * k +
    (0.0001178 - 0.000000155 * t) * t * t +
    0.00033 * dSin(166.56 + (132.87 - 0.009173 * t) * t);

  const m = 359.2242 + 29.10535608 * k - (0.0000333 - 0.00000347 * t) * t * t;
  const mPrime = 306.0253 + 385.81691806 * k + (0.0107306 + 0.00001236 * t) * t * t;
  const f = 21.2964 + 390.67050646 * k - (0.0016528 - 0.00000239 * t) * t * t;
  const sign = (tPhase < FULL) ? +1 : -1;

  switch (tPhase) {
    // new and full moon use one correction
    case NEW:
    case FULL:
      pt += (0.1734 - 0.000393 * t) * dSin(m) +
    0.0021 * dSin(2 * m) -
    0.4068 * dSin(mPrime) +
    0.0161 * dSin(2 * mPrime) -
    0.0004 * dSin(3 * mPrime) +
    0.0104 * dSin(2 * f) -
    0.0051 * dSin(m + mPrime) -
    0.0074 * dSin(m - mPrime) +
    0.0004 * dSin(2 * f + m) -
    0.0004 * dSin(2 * f - m) -
    0.0006 * dSin(2 * f + mPrime) +
    0.0010 * dSin(2 * f - mPrime) +
    0.0005 * dSin(m + 2 * mPrime);
      break;

      // first and last quarter moon use a different correction
    case FIRST:
    case LAST:
      pt += (0.1721 - 0.0004 * t) * dSin(m) +
    0.0021 * dSin(2 * m) -
    0.6280 * dSin(mPrime) +
    0.0089 * dSin(2 * mPrime) -
    0.0004 * dSin(3 * mPrime) +
    0.0079 * dSin(2 * f) -
    0.0119 * dSin(m + mPrime) -
    0.0047 * dSin(m - mPrime) +
    0.0003 * dSin(2 * f + m) -
    0.0004 * dSin(2 * f - m) -
    0.0006 * dSin(2 * f + mPrime) +
    0.0021 * dSin(2 * f - mPrime) +
    0.0003 * dSin(m + 2 * mPrime) +
    0.0004 * dSin(m - 2 * mPrime) -
    0.0003 * dSin(2 * m + mPrime);

      pt += sign * (0.0028 - 0.0004 * dCos(m) + 0.0003 * dCos(mPrime));

      break;
  }

  return fromJulian(pt);
}

export interface PhaseHuntObj {
  date: Date;
  type: string;
}

export function PhaseHunt(date: Date): PhaseHuntObj[] {
  if (!date) {
    date = new Date();
  }

  const aDate = new Date(date.getTime() - (45 * 86400000)); // 45 days prior
  let k1 = Math.floor(12.3685 * (aDate.getFullYear() + (1.0 / 12.0) * aDate.getMonth() - 1900));
  let nt1 = meanPhase(aDate.getTime(), k1);

  const julianDate = toJulian(date);
  let newADate = nt1 + SYNODIC_MONTH;
  let k2 = k1 + 1;
  let nt2 = meanPhase(newADate, k2);

  while (nt1 > julianDate || julianDate >= nt2) {
    newADate += SYNODIC_MONTH;
    k1++;
    k2++;
    nt1 = nt2;
    nt2 = meanPhase(newADate, k2);
  }

  return [
    {
      date: truePhase(k1, NEW),
      type: 'newMoon'
    }, {
      date: truePhase(k1, FIRST),
      type: 'firstQuarter'
    }, {
      date: truePhase(k1, FULL),
      type: 'fullMoon'
    }, {
      date: truePhase(k1, LAST),
      type: 'lastQuarter'
    }, {
      date: truePhase(k2, NEW),
      type: 'nextNewMoon'
    }
  ];
}

export interface MoonIlluminationObj {
  fraction: number;
  phase: number;
  angle: number;
}

export function MoonIllumination(date: Date): MoonIlluminationObj {
  const d = toDays(date || new Date());
  const s = sunCoords(d);
  const m = moonCoords(d);

  const distanceEarthSunKM = 149598000;

  const phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra));
  const inc = atan(distanceEarthSunKM * sin(phi), m.dist - distanceEarthSunKM * cos(phi));
  const angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) - cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

  return {
    fraction: (1 + cos(inc)) / 2,
    phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
    angle: angle
  };
}

export interface MoonTimesObj {
  rise?: Date;
  set?: Date;
  alwaysUp?: boolean;
  alwaysDown?: boolean;
}

export function MoonTimes(date: Date, lat: number, lng: number, inUTC: boolean): MoonTimesObj {
  const t = new Date(date);

  if (inUTC) {
    t.setUTCHours(0, 0, 0, 0);
  } else {
    t.setHours(0, 0, 0, 0);
  }

  const hc = 0.133 * rad;
  let h0 = getMoonPosition(t, lat, lng).altitude - hc;
  let h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

  // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
  for (let i = 1; i <= 24; i += 2) {
    h1 = getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
    h2 = getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

    a = (h0 + h2) / 2 - h1;
    b = (h2 - h0) / 2;
    xe = -b / (2 * a);
    ye = (a * xe + b) * xe + h1;
    d = b * b - 4 * a * h1;
    roots = 0;

    if (d >= 0) {
      dx = Math.sqrt(d) / (Math.abs(a) * 2);
      x1 = xe - dx;
      x2 = xe + dx;
      if (Math.abs(x1) <= 1) roots++;
      if (Math.abs(x2) <= 1) roots++;
      if (x1 < -1) x1 = x2;
    }

    if (roots === 1 && x1 !== undefined) {
      if (h0 < 0) rise = i + x1;
      else set = i + x1;
    } else if (roots === 2 && x1 !== undefined && x2 !== undefined) {
      rise = i + (ye < 0 ? x2 : x1);
      set = i + (ye < 0 ? x1 : x2);
    }

    if (rise && set) break;

    h0 = h2;
  }

  const result: MoonTimesObj = {};

  if (rise) result.rise = hoursLater(t, rise);
  if (set) result.set = hoursLater(t, set);

  if (!rise && !set) {
    result[ye !== undefined && ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;
  }

  return result;
}
