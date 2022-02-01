import { useRef, useState } from 'react';
import ImageList from './ImageList';
import style from './style.module.scss';
import { getFilesArray } from './utils';

// TODO hanndle the case when the user re-uploads the images
const UploadFile = ({ onFilesUploaded }) => {
  const pickerRef = useRef();
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFiles(getFilesArray(e.dataTransfer.files));
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleFilesPicked = (e) => {
    setFiles(getFilesArray(e.target.files));
  };

  const handlePickFile = () => {
    pickerRef.current.click();
  };

  return (
    <>
      <div
        className={style.fileSelector}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handlePickFile}
      >
        <p>upload photos</p>
        <input
          className={style.picker}
          type="file"
          ref={pickerRef}
          multiple
          onChange={handleFilesPicked}
        />
      </div>
      <ImageList files={files} onFilesUploaded={onFilesUploaded} />
    </>
  );
};

export default UploadFile;
