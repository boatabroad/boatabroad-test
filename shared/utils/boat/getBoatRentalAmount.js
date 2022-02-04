import moment from 'moment-timezone';

export const getBoatRentalAmount = (boat, startDateString, endDateString) => {
  const startDate = +moment(startDateString);
  const endDate = +moment(endDateString);
  const totalHours = (endDate - startDate) / 1000 / 60 / 60;
  const totalDays = totalHours / 24;
  const multiplyBy = boat.price.rentBy === 'Day' ? totalDays : totalHours;
  const totalAmount = boat.price.amount * multiplyBy;

  return +totalAmount.toFixed(2);
};
