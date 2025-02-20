import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner3 } from "react-icons/im";
import useAuth from "../hooks/useAuth";
import useAxiosInstance from "../hooks/useAxiosInstance";

const SocialLogin = () => {
  const { loginWithGithub, loginWithGoogle, loading } = useAuth();
  const axiosInstance = useAxiosInstance();

  //   handleGoogle
  const handleGoogle = async () => {
    try {
      const { user } = await loginWithGoogle();
      const userData = { displayName: user?.displayName, email: user?.email };

      //   set data db
      const { data } = await axiosInstance.post("/users", userData);
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      {/* GitHub */}
      <button className="btn bg-black text-white border-black flex items-center gap-2">
        <FaGithub />
        Login with GitHub
      </button>

      {/* Google */}
      <button
        onClick={handleGoogle}
        className="btn bg-white text-black border-black flex items-center gap-2"
      >
        {loading ? <ImSpinner3 className="animate-spin" /> : ""} <FcGoogle />
        Login with Google
      </button>
    </>
  );
};

export default SocialLogin;
