import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'shared/utils/firebase';

const boatRentalValidation = async (boat, date) => {
  const boatRentalsQuery = query(
    collection(db, `boats/${boat.id}/rentals`),
    where('date', '==', date)
  );
  const boatRentals = await getDocs(boatRentalsQuery);

  if (!boatRentals.docs.length) {
    return {};
  }

  return {
    status: 409,
    error: 'This boat is already rented on the selected date.',
  };
};

export const validateBoatRental = async (
  boat,
  amount,
  currency,
  date,
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
    return boatRentalValidation(boat, date);
  }

  return {};
};
