import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import sweetAlert from 'sweetalert';
import useUser from 'hooks/useUser';
import { createBoat } from 'services/api/boats/createBoat';
import { storage } from 'shared/utils/firebase';
import style from './newRentPost.module.scss';

const imageId = uuidv4();

const NewRentPost = () => {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  const handlePost = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    setUploadingImage(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${imageId}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPhotoUrl(downloadURL);
          setUploadingImage(false);
        });
      }
    );
  };

  const handleSubmit = () => {
    createBoat({
      ownerId: user.uid,
      photoUrl,
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

      <div className={style.uploadImg}>
        <input
          type="file"
          onChange={handleFileChange}
          placeholder="+ Upload Photo"
        />
      </div>
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
          disabled={uploadingImage}
          className={style.button}
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default NewRentPost;
