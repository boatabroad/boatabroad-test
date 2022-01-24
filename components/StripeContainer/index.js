import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const StripeContainer = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        boat={props.boat}
        onPaymentStart={props.onPaymentStart}
        onPaymentEnd={props.onPaymentEnd}
        onPaymentCompleted={props.onPaymentCompleted}
      />
    </Elements>
  );
};

StripeContainer.propTypes = {
  boat: PropTypes.object,
  onPaymentStart: PropTypes.func,
  onPaymentEnd: PropTypes.func,
  onPaymentCompleted: PropTypes.func,
};

export default StripeContainer;
