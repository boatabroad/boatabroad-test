import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { storage } from 'shared/utils/firebase';
import ProgressBar from './ProgressBar';
import style from './style.module.scss';

const Image = ({ file, onUploadFinish }) => {
  const [progress, setProgress] = useState(0);
  const isUploaded = progress === 100;

  useEffect(() => {
    if (isUploaded) {
      return;
    }

    const storageRef = ref(storage, `images/${file.id}`);
    const uploadTask = uploadBytesResumable(storageRef, file.file);
    let mounted = true;

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (snapshot.totalBytes !== 0) {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        if (!mounted) {
          console.log('NOT MOUNTED');
          return;
        }
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (!mounted) {
            console.log('NOT MOUNTED');
            return;
          }

          setProgress(100);
          console.log('uploaded', file.id);
          onUploadFinish(file.id, downloadURL);
        });
      }
    );

    return () => (mounted = false);
  }, []);

  return (
    <div className={style.imagePreview}>
      <img src={URL.createObjectURL(file.file)} className={style.image}></img>
      <ProgressBar progress={progress} />
    </div>
  );
};

const ImageList = ({ files, onFilesUploaded }) => {
  const [uploadedFileIds, setUploadedFileIds] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const uploadedFileIdsRef = useRef();
  const fileUrlsRef = useRef();
  uploadedFileIdsRef.current = uploadedFileIds;
  fileUrlsRef.current = fileUrls;

  const handleUploadFinish = (fileId, url) => {
    const newUploadedFileIds = [...uploadedFileIdsRef.current, fileId];
    const newFileUrls = [...fileUrlsRef.current, url];
    const allUploaded = files.every((x) => newUploadedFileIds.includes(x.id));

    setUploadedFileIds(newUploadedFileIds);
    setFileUrls(newFileUrls);

    if (allUploaded) {
      onFilesUploaded(newFileUrls);
    }
  };

  return (
    <div className={style.filesContainer}>
      {files.map((file, i) => (
        <Image key={i} file={file} onUploadFinish={handleUploadFinish} />
      ))}
    </div>
  );
};

export default ImageList;
