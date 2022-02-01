import style from './style.module.scss';

const ImageList = ({ files }) => {
  console.log('files', files);
  return (
    <div className={style.filesContainer}>
      {files.map((file, i) => (
        <img
          key={i}
          className={style.imagePreview}
          src={URL.createObjectURL(file)}
        ></img>
      ))}
    </div>
  );
};

export default ImageList;
