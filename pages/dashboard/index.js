import IfLoggedIn from 'components/IfLoggedIn';

const Dashboard = () => {
  return (
    <IfLoggedIn>
      <div>hola</div>
    </IfLoggedIn>
  );
};

export default Dashboard;
