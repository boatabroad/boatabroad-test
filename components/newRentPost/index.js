import React, { useState } from 'react';
import sweetAlert from 'sweetalert';
import useUser from 'hooks/useUser';
import { createBoat } from 'services/api/boats/createBoat';
import UploadFile from './UploadFile';
import style from './newRentPost.module.scss';

const NewRentPost = () => {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrls, setPhotoUrls] = useState([]);

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

  return (
    <form className={style.newRentPost} onSubmit={handlePost}>
      <h3 className={style.uploadText}>Rent new Boat</h3>

      <UploadFile onFilesUploaded={handleUploadFinish} />

      <h3 className={style.titleText}>Title</h3>

      <textarea
        className={style.title}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>

      <h3 className={style.titleText}>Subtitle</h3>
      <textarea
        className={style.subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      ></textarea>

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
