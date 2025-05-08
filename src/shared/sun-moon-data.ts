import * as SunCalc from 'suncalc';

export const MOSCOW_COORDS = {
  latitude: 55.751244,
  longitude: 37.618423,
};

/**
 * Using different lib for determining phase, so getting normalized phase value.
 * Later we multiply that by 30 in getMoonPhase.
 *
 * Source: https://www.npmjs.com/package/lunarphase-js
 */
export const MOON_PHASES = {
  NEW_MOON: [0, 1.84566173161],
  WAXING_CRESCENT: [1.84566173161, 5.53698519483],
  FIRST_QUARTER: [5.53698519483, 9.22830865805],
  WAXING_GIBBOUS: [9.22830865805, 12.91963212127],
  FULL_MOON: [12.91963212127, 16.61095558449],
  WANING_GIBBOUS: [16.61095558449, 20.30227904771],
  LAST_QUARTER: [20.30227904771, 23.99360251093],
  WANING_CRESCENT: [23.99360251093, 27.68492597415],
};

type MoonPhaseKey = keyof typeof MOON_PHASES;

export const getMoscowTime = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));

export const sunPositionData = SunCalc.getTimes(getMoscowTime(), MOSCOW_COORDS.latitude, MOSCOW_COORDS.longitude);
export const moonPositionData = SunCalc.getMoonIllumination(getMoscowTime());

export const currentTime = getMoscowTime().getTime();

export const isNight =
  currentTime >= sunPositionData.sunset.getTime() || currentTime <= sunPositionData.sunrise.getTime();
export const isDay = !isNight;

console.log('Time: ', getMoscowTime());
console.log('Sunset: ', sunPositionData.sunset);
console.log('Sunrise: ', sunPositionData.sunrise);

export const moonPhase = moonPositionData.phase; // 0.0 - 1.0

/**
 * Gets the current moon phase.
 *
 * @returns The current moon phase as a string.
 */
export function getMoonPhaseString(): MoonPhaseKey {
  const phaseValue = moonPhase * 30; // Multiply by 30 to get a value between 0 and 30

  for (const [key, [start, end]] of Object.entries(MOON_PHASES)) {
    if (phaseValue >= start && phaseValue < end) {
      return key as MoonPhaseKey;
    }
  }

  /**
   * The moon phase is not in the range of the defined phases,
   * so we assume it's a new moon.
   */
  if (phaseValue >= 27.68492597415 && phaseValue < 29.53058770576) {
    return 'NEW_MOON';
  }

  /**
   * If the phase is not in the range of the defined phases and
   * it's not a new moon, we return 'NEW_MOON' as a fallback.
   */
  return 'NEW_MOON';
}
