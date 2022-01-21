import { loadStripe } from '@stripe/stripe-js';

const apiKey =
  'pk_test_51INp1QDBqEpdrucKFgSsy3udXbT1mLdO6ITJAX35606Sj4GNJOVXWSeLvSnCMVYHoP1Xhq3cLkwRT94mQTbHUDfR00hEatARCz';

export default loadStripe(apiKey);
