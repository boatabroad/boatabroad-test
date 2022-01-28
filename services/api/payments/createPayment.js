import axios from 'axios';

export const createPayment = ({
  id,
  userId,
  boatId,
  startDate,
  endDate,
  amount,
  currency,
}) =>
  axios.post('/api/payments', {
    id,
    userId,
    boatId,
    startDate,
    endDate,
    amount,
    currency,
  });
