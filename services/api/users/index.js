import axios from 'axios';

export const addRoleToUser = (userId, role) =>
  axios
    .patch(`/api/users/${encodeURIComponent(userId)}`, { role })
    .catch((error) => {
      console.error('error setting user role', error);
    });
