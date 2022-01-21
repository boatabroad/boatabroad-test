import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import style from './style.module.css';

const CARD_OPTIONS = {
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

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      elements: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('/api/payment', { id, amount: 1000 });

        if (response.data.success) {
          console.log('payment successful', response.data);
          setSuccess(true);
        }
      } catch (err) {
        console.log('there was a payment error', err);
      }
    }
  };

  return (
    <div className="paymentForm">
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className={style.formGroup}>
            <div className={style.formRow}>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button type="submit" className={style.payButton}>
            Pay
          </button>
        </form>
      ) : (
        <div>
          <h2 className="message">
            You have successfully paid <span>$10</span>, thanks!
          </h2>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
