import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ClimbingBoxLoader } from 'react-spinners';
import PropTypes from 'prop-types';
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

const PaymentForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { boatId } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('/api/payments', {
          id,
          amount: 1000,
          // TODO replace by real user id
          userId: 'test-user',
          boatId,
        });

        if (response.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        }
      } catch (err) {
        console.log('there was a payment error', err);
      }
    }
    setLoading(false);
  };

  return (
    <div className={style.paymentForm}>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className={style.formGroup}>
            <CardElement options={CARD_OPTIONS} />
          </fieldset>
          {loading ? (
            <div className={style.loadingContainer}>
              We are processing you payment...
              <ClimbingBoxLoader />
            </div>
          ) : (
            <button type="submit" className={style.payButton}>
              Pay
            </button>
          )}
        </form>
      ) : (
        <div>
          <h2 className="message">
            Congratulations! You have successfully rented this boat.
          </h2>
        </div>
      )}
    </div>
  );
};

PaymentForm.propTypes = {
  boatId: PropTypes.string,
};

export default PaymentForm;
