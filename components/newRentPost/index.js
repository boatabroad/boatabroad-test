import React, { useState } from 'react';
import sweetAlert from 'sweetalert';
import useUser from 'hooks/useUser';
import { createBoat } from 'services/api/boats/createBoat';
import UploadFile from './UploadFile';
import style from './newRentPost.module.scss';
import { BOAT_TYPES, BOOLEAN_OPTIONS, RENT_BY_OPTIONS } from './constants';

const NewRentPost = () => {
  const { user } = useUser();
  const [photoUrls, setPhotoUrls] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [boatType, setBoatType] = useState(BOAT_TYPES[0]);
  const [withCaptain, setWithCaptain] = useState(true);
  const [city, setCity] = useState('');
  const [beach, setBeach] = useState('');
  const [description, setDescription] = useState('');
  const [rentBy, setRentBy] = useState(RENT_BY_OPTIONS[0]);
  const [price, setPrice] = useState('');
  const [minimumTime, setMinimumTime] = useState(1);
  const [damageDeposit, setDamageDeposit] = useState('');
  const [sailors, setSailors] = useState(0);
  const [includesFood, setIncludesFood] = useState(BOOLEAN_OPTIONS[0]);
  const [includesDrinks, setIncludesDrinks] = useState(BOOLEAN_OPTIONS[0]);
  const [bathrooms, setBathrooms] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [hasKitchen, setHasKitchen] = useState(BOOLEAN_OPTIONS[0]);

  const handleUploadFinish = (uploadedPhotoUrls) => {
    setPhotoUrls(uploadedPhotoUrls);
  };

  const handlePost = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    createBoat({
      ownerId: user.uid,
      photos: photoUrls,
      title,
      subtitle,
      description,
      price: { amount: 10, currency: 'USD' },
    })
      .then((response) => {
        // TODO redirect to the new boat detail page
        console.log('Created boat with id', response.data.id);
        sweetAlert('Success', 'The boat was created successfully!', 'success');
      })
      .catch((error) => {
        console.error('error creating the boat', error);
        sweetAlert(
          'Error',
          'There was an error creating the boat, please try again later.',
          'error'
        );
      });
  };

  console.log('withCaptain', withCaptain);

  return (
    <form className={style.newRentPost} onSubmit={handlePost}>
      <h3 className={style.uploadText}>Rent new Boat</h3>

      <UploadFile onFilesUploaded={handleUploadFinish} />

      <h3 className={style.titleText}>Title</h3>

      <textarea
        className={style.field}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>

      <h3 className={style.titleText}>Subtitle</h3>
      <textarea
        className={style.field}
        onChange={(e) => setSubtitle(e.target.value)}
      ></textarea>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2 md:mr-7">
          <h3 className={style.titleText}>Boat type</h3>
          <select
            className={style.field}
            value={boatType}
            onChange={(e) => setBoatType(e.target.value)}
          >
            {BOAT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="md:w-1/2 md:ml-7">
          <h3 className={style.titleText}>With or without captain</h3>
          <select
            className={style.field}
            onChange={(e) => setWithCaptain(e.target.value === 'WithCaptain')}
          >
            <option value="WithCaptain">With captain</option>
            <option value="Without captain">Without captain</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2 md:mr-7">
          <h3 className={style.titleText}>City</h3>
          <textarea
            className={style.field}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></textarea>
        </div>

        <div className="md:w-1/2 md:ml-7">
          <h3 className={style.titleText}>Marina / Beach</h3>
          <textarea
            className={style.field}
            value={beach}
            onChange={(e) => setBeach(e.target.value)}
          ></textarea>
        </div>
      </div>

      <h3 className={style.titleText}>Description</h3>
      <textarea
        className={`${style.field} ${style.description}`}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/5 md:mr-3">
          <h3 className={style.titleText}>Rent by</h3>
          <select
            className={style.field}
            value={rentBy}
            onChange={(e) => setRentBy(e.target.value)}
          >
            {RENT_BY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/5 md:ml-3 md:mr-3">
          <h3 className={style.titleText}>Price per {rentBy}</h3>
          <textarea
            className={style.field}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></textarea>
        </div>
        <div className="md:w-1/5 md:ml-3 md:mr-3">
          <h3 className={style.titleText}>Minimum {rentBy}s</h3>
          <input
            className={style.field}
            type="number"
            value={minimumTime}
            min={1}
            max={100}
            onChange={(e) => setMinimumTime(e.target.value)}
          ></input>
        </div>
        <div className="md:w-1/5 md:ml-3 md:mr-3">
          <h3 className={style.titleText}>Damage deposit</h3>
          <textarea
            className={style.field}
            value={damageDeposit}
            onChange={(e) => setDamageDeposit(e.target.value)}
          ></textarea>
        </div>
        <div className="md:w-1/5 md:ml-3">
          <h3 className={style.titleText}>Num of sailors</h3>
          <input
            className={style.field}
            type="number"
            min={0}
            max={100}
            value={sailors}
            onChange={(e) => setSailors(e.target.value)}
          ></input>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/5 md:mr-3">
          <h3 className={style.titleText}>Includes food</h3>
          <select
            className={style.field}
            value={includesFood}
            onChange={(e) => setIncludesFood(e.target.value)}
          >
            {BOOLEAN_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/5 md:ml-3 md:mr-3">
          <h3 className={style.titleText}>Includes drinks</h3>
          <select
            className={style.field}
            value={includesDrinks}
            onChange={(e) => setIncludesDrinks(e.target.value)}
          >
            {BOOLEAN_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/5 md:ml-3 md:mr-3">
          <h3 className={style.titleText}>Bathrooms</h3>
          <input
            className={style.field}
            type="number"
            min={0}
            max={20}
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          ></input>
        </div>
        <div className="md:w-1/5 md:ml-3 md:mr-3">
          <h3 className={style.titleText}>Bedrooms</h3>
          <input
            className={style.field}
            type="number"
            min={0}
            max={20}
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          ></input>
        </div>
        <div className="md:w-1/5 md:ml-3">
          <h3 className={style.titleText}>Kitchen</h3>
          <select
            className={style.field}
            value={hasKitchen}
            onChange={(e) => setHasKitchen(e.target.value)}
          >
            {BOOLEAN_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={style.butttonBox}>
        <button
          onClick={handleSubmit}
          disabled={!photoUrls.length}
          className={style.button}
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default NewRentPost;
