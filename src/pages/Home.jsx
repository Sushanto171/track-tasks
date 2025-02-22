import { ImSpinner3 } from "react-icons/im";
import { io } from "socket.io-client";
import AddTask from "../components/AddTask";
import Container from "../components/Container";
import TaskLayout from "../components/TaskLayout";
import useAuth from "../hooks/useAuth";
import AuthModal from "../modals/AuthModal";
import Footer from "./../components/Footer";
import Navbar from "./../components/Navbar";
const socket = io(import.meta.env.VITE_SEVER_URL);
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
    <div className="relative">
      <Navbar />
      <Container>
        {user ? (
          <>
            <AddTask />
            {/* Task layout */}
            <TaskLayout socket={socket} />
            {/* <KanbanBoard /> */}
            <Footer />
          </>
        ) : (
          <>
            <AuthModal user={user} />
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;
