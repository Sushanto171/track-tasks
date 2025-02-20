import AddTask from "../components/AddTask";
import TaskLayout from "../components/TaskLayout";
import useAuth from "../hooks/useAuth";
import AuthModal from "../modals/AuthModal";
import Footer from "./../components/Footer";
import Navbar from "./../components/Navbar";
const Home = () => {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <>
          <Navbar />
          <AddTask />
          {/* Task layout */}
          <TaskLayout />
          <Footer />
        </>
      ) : (
        <>
          <AuthModal user={user} />
        </>
      )}
    </>
  );
};

export default Home;
