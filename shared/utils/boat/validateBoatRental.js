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
      error: 'This boat has not been published yet.',
    };
  }

  if (boat.rentedBy) {
    return {
      status: 409,
      error: 'This boat is already rented.',
    };
  }

  if (boat.processingPayment) {
    return {
      status: 409,
      error: 'Someone else is renting this boat at this moment.',
    };
  }

  if (boat.price.amount !== amount || boat.price.currency !== currency) {
    return {
      status: 409,
      error:
        'The price has been changed. Please refresh the page and try again.',
    };
  }

  return {};
};
