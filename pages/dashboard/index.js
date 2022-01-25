import IfLoggedIn from 'components/IfLoggedIn';
import style from './dashboard.module.scss';

import NavBar from 'components/navBar';
import LateralMenu from 'components/lateralMenu';
import NewRentPost from 'components/newRentPost';

const Dashboard = () => {
  return (
    <IfLoggedIn>
      <div className={style.container}>
        <NavBar />
        <LateralMenu />
        <NewRentPost />
      </div>
    </IfLoggedIn>
  );
};

export default Dashboard;
