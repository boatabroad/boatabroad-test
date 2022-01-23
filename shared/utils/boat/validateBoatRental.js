export const validateBoatRental = (boat) => {
  if (!boat) {
    return {
      status: 404,
      error: 'The boat was not found.',
    };
  }

  if (!boat.published) {
    return {
      status: 409,
      error: 'The boat is not published yet.',
    };
  }

  if (boat.rentedBy) {
    return {
      status: 409,
      error: 'The boat is already rented by someone else.',
    };
  }

  if (boat.processingPayment) {
    return {
      status: 409,
      error: 'Someone else is renting this boat at this moment.',
    };
  }

  return {};
};
