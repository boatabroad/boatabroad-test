import React from 'react';
import style from './newRentPost.module.scss';

const NewRentPost = () => {
  return (
    <div className={style.newRentPost}>
      <h3 className={style.uploadText}>Rent new Boat</h3>
      <div className={style.uploadImg}>+ Upload Photo</div>

      <h3>Title</h3>
      <div className={style.title}></div>

      <h3>Subtitle</h3>
      <div className={style.subtitle}></div>

      <h3>Description</h3>
      <div className={style.description}></div>
    </div>
  );
};

export default NewRentPost;
