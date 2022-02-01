import { v4 as uuid } from 'uuid';

export const getFilesArray = (files) => {
  const newFiles = [];
  for (let i = 0; i < files.length; i++) {
    newFiles.push({
      id: uuid(),
      file: files[i],
      progress: 0,
      url: '',
    });
  }
  return newFiles;
};

export const validateFiles = (filesObject) => {
  // const files = getFilesArray(filesObject);
};
