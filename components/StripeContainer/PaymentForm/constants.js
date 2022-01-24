export const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export const SUCCESS_MESSAGE =
  'You have successfully rented this boat. It will be added to your boat list once the payment is confirmed.';

export const PRICE_CHANGED_MESSAGE = (oldBoat, newBoat) =>
  `The price of this boat has changed from $${oldBoat.price.amount} ${oldBoat.price.currency} to $${newBoat.price.amount} ${newBoat.price.currency}.\n\nIf you still want to rent this boat, please click the "Pay ${newBoat.price.amount} ${newBoat.price.currency}" button.`;
