import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from 'components/PaymentForm';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
