import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <>
      <h1>this is Dashboard</h1>
      <h1>{user?.name}</h1>
    </>
  );
};

export default Dashboard;
