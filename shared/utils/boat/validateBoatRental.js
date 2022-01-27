import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment-timezone';
import { db } from 'shared/utils/firebase';

const alreadyRentedError = {
  status: 409,
  error: 'This boat is already rented at the selected time.',
};

const boatRentalValidation = async (boat, startDate, endDate) => {
  const intervalStart = moment(startDate)
    .tz('UTC')
    .subtract(boat.rentMinuteInterval, 'minutes')
    .toDate();
  const intervalEnd = moment(endDate)
    .tz('UTC')
    .add(boat.rentMinuteInterval, 'minutes')
    .toDate();

  console.log('intervalStart', intervalStart);
  console.log('intervalEnd', intervalEnd);

  // Searches rentals whose end date overlaps with the interval
  let boatRentals = await getDocs(
    query(
      collection(db, `boats/${boat.id}/rentals`),
      where('endDate', '>', intervalStart),
      where('endDate', '<', intervalEnd)
    )
  );

  if (boatRentals.docs.length) {
    console.log('existing end date overlapping with interval');
    return alreadyRentedError;
  }

  // Searches rentals whose start date overlaps with the interval
  boatRentals = await getDocs(
    query(
      collection(db, `boats/${boat.id}/rentals`),
      where('startDate', '>', intervalStart),
      where('startDate', '<', intervalEnd)
    )
  );

  if (boatRentals.docs.length) {
    console.log('existing start date overlapping with interval');
    return alreadyRentedError;
  }

  return { status: null, error: null };
};

export const validateBoatRental = async (
  boat,
  amount,
  currency,
  startDate,
  endDate,
  validateRental
) => {
  if (!boat) {
    return {
      status: 404,
      error: 'The boat was not found.',
    };
  }

  if (!boat.published) {
    return {
      status: 409,
      error: 'This boat has not been published yet.',
    };
  }

  if (boat.price.amount !== amount || boat.price.currency !== currency) {
    return {
      status: 409,
      error:
        'The price has been changed. Please refresh the page and try again.',
    };
  }

  if (validateRental) {
    return boatRentalValidation(boat, startDate, endDate);
  }

  return { status: null, error: null };
};
