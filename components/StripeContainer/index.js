import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from 'components/PaymentForm';

const PUBLIC_KEY =
  'pk_test_51INp1QDBqEpdrucKFgSsy3udXbT1mLdO6ITJAX35606Sj4GNJOVXWSeLvSnCMVYHoP1Xhq3cLkwRT94mQTbHUDfR00hEatARCz';
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
