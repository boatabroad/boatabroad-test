import ProgressBar from './ProgressBar';
import style from './style.module.scss';

const ImageList = ({ files }) => {
  return (
    <div className={style.filesContainer}>
      {files.map((file, i) => (
        <div key={i} className={style.imagePreview}>
          <img
            src={URL.createObjectURL(file.file)}
            className={style.image}
          ></img>
          <ProgressBar progress={file.progress} />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
