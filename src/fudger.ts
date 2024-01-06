const foxPreRoll = '00:00:30.955'
const foxPreRollSeasonFive = '00:00:30.155'
const noJoke = "no" // represents 

export const seasonOffset : Record<number, Record<number, string>> = {
  4: {
    4: foxPreRoll,
    21: noJoke,
    22: noJoke
  },
  5: {
    1: noJoke,
    2: noJoke,
    4: noJoke,
    5: foxPreRollSeasonFive,
    6: foxPreRollSeasonFive,
    9: foxPreRollSeasonFive,
    10: foxPreRollSeasonFive,
    12: foxPreRollSeasonFive,
    16: foxPreRollSeasonFive,
    20: foxPreRollSeasonFive,
    21: noJoke
  },
  6: {
    1: foxPreRoll,
    19: '00:00:01.275'
  },
  7: {
    7: noJoke,
    12: foxPreRollSeasonFive,
    14: foxPreRollSeasonFive,
  },
  8: {
    1: noJoke,
    14: foxPreRollSeasonFive,
    15: foxPreRollSeasonFive,
  },
  10: {
    4: '00:00:02.955',
  },
  12: {
    3: noJoke,
    21: noJoke,
    22: noJoke
  },
  13: {
    6: noJoke,
    10: noJoke,
    22: noJoke
  },
  14: {
    1: noJoke
  }
} 

export const offsetByShow: Record<string, Record<number, Record<number, string>>> = {
  'bobs burgers': seasonOffset
}