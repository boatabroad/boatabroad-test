import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ClimbingBoxLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import sweetAlert from 'sweetalert';
import useUser from 'hooks/useUser';
import style from './style.module.css';
import { CARD_OPTIONS, SUCCESS_MESSAGE } from './constants';

const PaymentForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { user } = useUser();
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
        props.onPaymentStart();
        const response = await axios.post('/api/payments', {
          id,
          userId: user.uid,
          boatId: boat.id,
          amount: boat.price.amount,
          currency: boat.price.currency,
        });

        if (response.status === 200) {
          props.onPaymentCompleted();
          sweetAlert('Congratulations!', SUCCESS_MESSAGE, 'success').then(
            () => {
              router.push('/dashboard');
            }
          );
        }
      } catch (err) {
        console.log('there was a payment error', err);
        const { response } = err;
        if (response?.data?.error) {
          sweetAlert('Payment error', response.data.error, 'error');
        } else {
          sweetAlert('Payment error', 'There was an unknown error', 'error');
        }
      }
      props.onPaymentEnd();
    } else {
      console.error('error', error);
    }
    setLoading(false);
  };

  return (
    <div className={style.paymentForm}>
      <form onSubmit={handleSubmit}>
        <fieldset className={style.formGroup}>
          <CardElement options={CARD_OPTIONS} />
        </fieldset>
        {loading ? (
          <div className={style.loadingContainer}>
            We are processing your payment...
            <ClimbingBoxLoader />
          </div>
        ) : (
          <button type="submit" className={style.payButton}>
            Pay ${boat.price.amount} {boat.price.currency}
          </button>
        )}
      </form>
    </div>
  );
};

PaymentForm.propTypes = {
  boat: PropTypes.object,
  onPaymentStart: PropTypes.func,
  onPaymentEnd: PropTypes.func,
  onPaymentCompleted: PropTypes.func,
};

export default PaymentForm;
