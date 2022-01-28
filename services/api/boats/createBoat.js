import axios from 'axios';

export const createBoat = ({
  ownerId,
  photoUrl,
  price,
  title,
  subtitle,
  description,
}) =>
  axios.post('/api/boats', {
    ownerId,
    photoUrl,
    price,
    title,
    subtitle,
    description,
  });
