import React, { useState } from 'react';
import style from './newRentPost.module.scss';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';
import useUser from 'hooks/useUser';
import { createBoat } from 'services/api/boats/createBoat';

const uuid = uuidv4();

const NewRentPost = () => {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [subtitle, setsubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const storage = getStorage();

  console.log(title, subtitle, description);

  const handlePost = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const metadata = {
    contentType: 'image/jpeg',
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + image.name + '-id:' + uuid);
  const uploadTask = uploadBytesResumable(storageRef, image, metadata);

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
        console.log('File available at', downloadURL);
      });
    }
  );

  const handleSubmit = () => {
    createBoat({
      ownerId: user.uid,
      photoUrl: 'http://example.com',
      title,
      subtitle,
      price: { amount: 10, currency: 'USD' },
    });
  };

  // const uploadImage = () => {
  //   const upload = storage.ref(`images/${image.name}`).put(image)
  //   upload.on(
  //     "stateChange",
  //     snapshot => { console.log(snapshot); },
  //     error => { console.log(error) },
  //     () => {
  //       storage
  //         .ref("images")
  //         .child(image.nam)
  //         .getDownloadURL()
  //         .then(url => {
  //           console.log(url);
  //         })
  //     }
  //   )
  // }

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
        onChange={(e) => setsubtitle(e.target.value)}
      ></textarea>

      <h3 className={style.titleText}>Description</h3>
      <textarea
        className={style.description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Upload</button>
    </form>
  );
};

export default NewRentPost;
