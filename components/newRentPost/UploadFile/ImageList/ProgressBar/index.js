import style from './style.module.scss';

const ProgressBar = ({ progress }) => {
  return (
    <div className={style.progressBarContainer}>
      <div className={style.progressBar} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
