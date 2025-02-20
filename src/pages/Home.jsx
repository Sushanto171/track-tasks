import { Outlet } from "react-router";
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
          <Outlet />
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
