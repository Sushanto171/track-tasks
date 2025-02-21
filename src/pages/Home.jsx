import { ImSpinner3 } from "react-icons/im";
import AddTask from "../components/AddTask";
import Container from "../components/Container";
import TaskLayout from "../components/TaskLayout";
import useAuth from "../hooks/useAuth";
import AuthModal from "../modals/AuthModal";
import Footer from "./../components/Footer";
import Navbar from "./../components/Navbar";
const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ImSpinner3 className="animate-spin text-2xl" />
      </div>
    );
  }
  return (
    <Container>
      {user ? (
        <>
          <Navbar />
          <AddTask />
          {/* Task layout */}
          <TaskLayout />
          {/* <TaskBoard /> */}
          <Footer />
        </>
      ) : (
        <>
          <AuthModal user={user} />
        </>
      )}
    </Container>
  );
};

export default Home;
