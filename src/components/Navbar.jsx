import useAuth from "../hooks/useAuth";
import ThemeToggle from "./ThemToggle";

const Navbar = () => {
  const { userSignOut } = useAuth();

  return (
    <div className="h-20 ">
      <ThemeToggle />
      this is navbar
      <button onClick={() => userSignOut()} className="btn">
        Sign out
      </button>
    </div>
  );
};

export default Navbar;
