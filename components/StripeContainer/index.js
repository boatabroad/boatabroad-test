import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const StripeContainer = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm boatId={props.boatId} />
    </Elements>
  );
};

StripeContainer.propTypes = {
  boatId: PropTypes.string,
};

export default StripeContainer;
