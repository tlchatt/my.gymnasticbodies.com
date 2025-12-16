import moment from 'moment-timezone';

export const getCalanderDate = (userTimeZone, chosenFormat = "YYYY-MM-DD" ) => {
  let currentDate = moment().tz(userTimeZone);

  let weekStart = currentDate.clone().startOf('isoWeek');

  let days = [];

  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days').format(chosenFormat));
  }
  return days;
}

export default function getCurrentWeek(userTimeZone) {
  let currentDate = moment().tz(userTimeZone);

  let weekStart = currentDate.clone().startOf('isoWeek');

  let days = [];

  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days').format("D"));
  }
  return days;
}
