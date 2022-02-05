import React, { useState } from 'react';
import sweetAlert from 'sweetalert';
import useUser from 'hooks/useUser';
import { createBoat } from 'services/api/boats/createBoat';
import UploadFile from './UploadFile';
import style from './newRentPost.module.scss';
import {
  BOAT_TYPES,
  CREW_OPTIONS,
  BOOLEAN_OPTIONS,
  CURRENCY_OPTIONS,
  RENT_BY_OPTIONS,
} from './constants';
import { validateFields } from './utils';

const NewRentPost = () => {
  const { user } = useUser();
  const [photoUrls, setPhotoUrls] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [type, setType] = useState(BOAT_TYPES[0]);
  const [size, setSize] = useState('');
  const [crew, setCrew] = useState(CREW_OPTIONS[0]);
  const [city, setCity] = useState('');
  const [beach, setBeach] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [rentBy, setRentBy] = useState(RENT_BY_OPTIONS[0]);
  const [priceAmount, setPriceAmount] = useState('');
  const [minimumTime, setMinimumTime] = useState(1);
  const [damageDeposit, setDamageDeposit] = useState('');
  const [sailors, setSailors] = useState('');
  const [includesFood, setIncludesFood] = useState(BOOLEAN_OPTIONS[0]);
  const [includesDrinks, setIncludesDrinks] = useState(BOOLEAN_OPTIONS[0]);
  const [bathrooms, setBathrooms] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [hasKitchen, setHasKitchen] = useState(BOOLEAN_OPTIONS[0]);

  const handleUploadFinish = (uploadedPhotoUrls) => {
    setPhotoUrls(uploadedPhotoUrls);
  };

  const handlePost = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (
      !validateFields({
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
      })
    ) {
      return;
    }

    createBoat({
      ownerId: user.uid,
      photos: photoUrls,
      title,
      subtitle,
      type,
      size: +size,
      crew: +crew,
      city,
      beach,
      description,
      price: { rentBy, amount: +priceAmount, currency },
      minimumTime: +minimumTime,
      damageDeposit: +damageDeposit,
      sailors: +sailors,
      includesFood: includesFood === 'Yes',
      includesDrinks: includesDrinks === 'Yes',
      bathrooms: +bathrooms,
      bedrooms: +bedrooms,
      hasKitchen: hasKitchen === 'Yes',
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
          'error',
        );
      });
  };

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
        <div className="md:w-1/3 md:mr-6">
          <h3 className={style.titleText}>Boat type</h3>
          <select
            className={style.field}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {BOAT_TYPES.map((_type) => (
              <option key={_type} value={_type}>
                {_type}
              </option>
            ))}
          </select>
        </div>

        <div className="md:w-1/3 md:ml-6 md:mr-6">
          <h3 className={style.titleText}>Size (ft)</h3>
          <textarea
            className={style.field}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          ></textarea>
        </div>

        <div className="md:w-1/3 md:ml-6">
          <h3 className={style.titleText}>Crew</h3>
          <select
            className={style.field}
            value={crew}
            onChange={(e) => setCrew(e.target.value)}
          >
            {CREW_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
        <div className="md:w-1/6 md:mr-3">
          <h3 className={style.titleText}>Currency</h3>
          <select
            className={style.field}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {CURRENCY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/6 md:ml-3 md:mr-3">
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
        <div className="md:w-1/6 md:ml-3 md:mr-3">
          <h3 className={style.titleText}>Price per {rentBy}</h3>
          <input
            className={style.field}
            type="number"
            min={0}
            value={priceAmount}
            onChange={(e) => setPriceAmount(e.target.value)}
          ></input>
        </div>
        <div className="md:w-1/6 md:ml-3 md:mr-3">
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
        <div className="md:w-1/6 md:ml-3 md:mr-3">
          <h3 className={style.titleText}>Damage deposit</h3>
          <input
            className={style.field}
            type="number"
            min={0}
            value={damageDeposit}
            onChange={(e) => setDamageDeposit(e.target.value)}
          ></input>
        </div>
        <div className="md:w-1/6 md:ml-3">
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
        <button onClick={handleSubmit} className={style.button}>
          Upload
        </button>
      </div>
    </form>
  );
};

export default NewRentPost;
