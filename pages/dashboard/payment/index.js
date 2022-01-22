import StripeContainer from 'components/StripeContainer';
import style from './style.module.css';

const PaymentPage = () => {
  return (
    <>
      <h1 className={style.title}>Rent a boat</h1>
      <StripeContainer />
    </>
  );
};

export default PaymentPage;
