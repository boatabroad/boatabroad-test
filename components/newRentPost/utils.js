import swalert from 'sweetalert';

const showError = (error) => swalert('Validation Error', error, 'error');

export const validateFields = ({
  photoUrls,
  title,
  subtitle,
  size,
  city,
  beach,
  description,
  priceAmount,
  minimumTime,
  damageDeposit,
  sailors,
  bathrooms,
  bedrooms,
}) => {
  if (!photoUrls.length) {
    showError('Please upload at least one photo.');
    return false;
  }
  if (!title) {
    showError('Please provide a title.');
    return false;
  }
  if (title.length > 100) {
    showError('Title is too long. Please keep it under 100 characters.');
    return false;
  }
  if (!subtitle) {
    showError('Please provide a subtitle.');
    return false;
  }
  if (subtitle.length > 100) {
    showError('Subtitle is too long. Please keep it under 100 characters.');
    return false;
  }
  if (!size) {
    showError('Please provide a size.');
    return false;
  }
  if (size.length > 25) {
    showError('Size is too long. Please keep it under 25 characters.');
    return false;
  }
  if (!city) {
    showError('Please provide a city.');
    return false;
  }
  if (city.length > 100) {
    showError('City is too long. Please keep it under 100 characters.');
    return false;
  }
  if (!beach) {
    showError('Please provide a marina / beach.');
    return false;
  }
  if (beach.length > 100) {
    showError(
      'Marina / beach is too long. Please keep it under 100 characters.'
    );
    return false;
  }
  if (!description) {
    showError('Please provide a description.');
    return false;
  }
  if (description.length > 1000) {
    showError('Description is too long. Please keep it under 1000 characters.');
    return false;
  }
  if (!priceAmount) {
    showError('Please provide a price.');
    return false;
  }
  if (priceAmount.length > 100) {
    showError('Price is too long. Please keep it under 100 characters.');
    return false;
  }
  if (!minimumTime) {
    showError('Please provide a minimum time.');
    return false;
  }
  if (minimumTime.length > 100) {
    showError('Minimum time is too long. Please keep it under 100 characters.');
    return false;
  }
  if (!damageDeposit) {
    showError('Please provide a damage deposit.');
    return false;
  }
  if (damageDeposit.length > 100) {
    showError(
      'Damage deposit is too long. Please keep it under 100 characters.'
    );
    return false;
  }
  if (!sailors) {
    showError('Please provide a number of sailors.');
    return false;
  }
  if (sailors.length > 10) {
    showError(
      'Number of sailors is too long. Please keep it under 10 characters.'
    );
    return false;
  }
  if (!bathrooms) {
    showError('Please provide a number of bathrooms.');
    return false;
  }
  if (bathrooms.length > 10) {
    showError(
      'Number of bathrooms is too long. Please keep it under 10 characters.'
    );
    return false;
  }
  if (!bedrooms) {
    showError('Please provide a number of bedrooms.');
    return false;
  }
  if (bedrooms.length > 10) {
    showError(
      'Number of bedrooms is too long. Please keep it under 10 characters.'
    );
    return false;
  }

  return true;
};
