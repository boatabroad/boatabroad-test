import IfLoggedIn from 'components/IfLoggedIn';

import NewRentPost from 'components/newRentPost';
import OwnerLayout from 'components/layout/ownerLayout';

const Dashboard = () => {
  return (
    <IfLoggedIn>
      <OwnerLayout>
        <NewRentPost />
      </OwnerLayout>
    </IfLoggedIn>
  );
};

export default Dashboard;
