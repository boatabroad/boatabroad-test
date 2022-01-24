export const validateBoatRental = (boat, amount, currency) => {
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

  if (boat.price.amount !== amount) {
    return {
      status: 409,
      error: 'The amount is not correct.',
    };
  }
  if (boat.price.currency !== currency) {
    return {
      status: 409,
      error: 'The currency is not correct.',
    };
  }

  return {};
};
