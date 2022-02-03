export const getAvatarUrl = (user) => {
  if (!user) {
    return null;
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name || user.email
  )}&background=0D8ABC&color=fff&size=40&bold=true`;
};
