import React, { useState } from 'react';
import sweetAlert from 'sweetalert';
import useUser from 'hooks/useUser';
import { createBoat } from 'services/api/boats/createBoat';
import UploadFile from './UploadFile';
import style from './newRentPost.module.scss';
import { BOAT_TYPES } from './constants';

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

      <div className="flex justify-between">
        <div className="w-1/2 mr-7">
          <h3 className={style.titleText}>Boat type</h3>
          <select
            className={style.boatType}
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

        <div className="w-1/2 ml-7">
          <h3 className={style.titleText}>With or without captain</h3>
          <select
            className={style.boatType}
            onChange={(e) => setWithCaptain(e.target.value === 'WithCaptain')}
          >
            <option value="WithCaptain">With captain</option>
            <option value="Without captain">Without captain</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-1/2 mr-7">
          <h3 className={style.titleText}>City</h3>
          <textarea
            className={style.field}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></textarea>
        </div>
        <div className="w-1/2 ml-7">
          <h3 className={style.titleText}>Beach</h3>
          <textarea
            className={style.field}
            value={beach}
            onChange={(e) => setBeach(e.target.value)}
          ></textarea>
        </div>
      </div>

      <h3 className={style.titleText}>Description</h3>
      <textarea
        className={style.description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
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
