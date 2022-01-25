import Image from 'next/image';
import React, { useState } from 'react';
import style from './newRentPost.module.scss';

const NewRentPost = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setsubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  console.log(title, subtitle, description);
  const handlePost = (e) => {
    e.preventDefault();
  };

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  console.log(handleFileChange);

  return (
    <form className={style.newRentPost} onSubmit={handlePost}>
      <h3 className={style.uploadText}>Rent new Boat</h3>
      {image > 0 ? (
        <Image
          alt="Picture of the author"
          width={300}
          height={300}
          className={style.uploadImg}
        />
      ) : (
        <input
          className={style.uploadImg}
          id="fileSelector"
          type="file"
          name="file"
          style={{ outline: 'none' }}
          onClick={handlePictureClick}
          placeholder="+ Upload Photo"
        />
      )}

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
    </form>
  );
};

export default NewRentPost;
