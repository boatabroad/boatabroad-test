import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ClimbingBoxLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import useUser from 'hooks/useUser';
import style from './style.module.css';
import { CARD_OPTIONS } from './constants';

const PaymentForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { user } = useUser();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { boat } = props;

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
          userId: user.uid,
          boatId: boat.id,
          amount: boat.price.amount,
          currency: boat.price.currency,
        });

        if (response.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            router.push('/dashboard');
          }, 4000);
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
              Pay ${boat.price.amount} {boat.price.currency}
            </button>
          )}
        </form>
      ) : (
        <div>
          <h2 className="message">
            Congratulations! You have successfully rented this boat. It will be
            added to your boat list once the payment succeeds.
          </h2>
        </div>
      )}
    </div>
  );
};

PaymentForm.propTypes = {
  boat: PropTypes.object,
};

export default PaymentForm;
