import axios from 'axios';

export const createBoat = ({ ownerId, photoUrl, price, title, subtitle }) =>
  axios.post('/api/boats', {
    ownerId,
    photoUrl,
    price,
    title,
    subtitle,
  });
