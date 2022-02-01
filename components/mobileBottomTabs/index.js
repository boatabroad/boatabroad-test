import React from 'react';
import style from './style.module.scss';
import {
  PlusIcon,
  ChartBarIcon,
  ChatAltIcon,
  DocumentReportIcon,
  HomeIcon,
} from '@heroicons/react/solid';

const MobileBottomTabs = () => {
  return (
    <div className={style.bottomTabIcons}>
      <HomeIcon onClick={() => console.log('click')} className={style.icon} />
      <ChartBarIcon
        onClick={() => console.log('click')}
        className={style.icon}
      />
      <PlusIcon onClick={() => console.log('click')} className={style.icon} />
      <ChatAltIcon
        onClick={() => console.log('click')}
        className={style.icon}
      />
      <DocumentReportIcon
        onClick={() => console.log('click')}
        className={style.icon}
      />
    </div>
  );
};
export default MobileBottomTabs;
