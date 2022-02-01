import axios from 'axios';

export const createBoat = ({
  ownerId,
  photos,
  price,
  title,
  subtitle,
  description,
}) =>
  axios.post('/api/boats', {
    ownerId,
    photos,
    price,
    title,
    subtitle,
    description,
  });
