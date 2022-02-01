// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRef, useState } from 'react';
// import { storage } from 'shared/utils/firebase';
// import { v4 as uuid } from 'uuid';
import ImageList from './ImageList';
import style from './style.module.scss';
import { getFilesArray } from './utils';

// const imageId = uuid();

const UploadFile = () => {
  const pickerRef = useRef();
  // const [, setUploadingImage] = useState(false);
  // const [, setPhotoUrl] = useState(null);
  const [files, setFiles] = useState([]);

  // const handleFileChange = (e) => {
  //   setUploadingImage(true);
  //   const file = e.target.files[0];
  //   const storageRef = ref(storage, `images/${imageId}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   // Listen for state changes, errors, and completion of the upload.
  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       console.log(snapshot);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setPhotoUrl(downloadURL);
  //         setUploadingImage(false);
  //       });
  //     }
  //   );
  // };

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    setFiles(getFilesArray(files));
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
      <ImageList files={files} />
    </>
  );
};

export default UploadFile;
