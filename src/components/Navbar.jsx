import { IoMdNotificationsOutline } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import Container from "./Container";
import ThemeToggle from "./ThemToggle";

const Navbar = () => {
  const { userSignOut } = useAuth();
  const { notifications } = useAuth();

  return (
    <div className=" bg-base-100 shadow-sm sticky top-0">
      <Container>
        <div className="navbar">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Track Tasks</a>
          </div>
          <div className="flex-none flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <IoMdNotificationsOutline size={20} />
                  <span className="badge border-0 badge-sm bg-transparent indicator-item">
                    {notifications?.length}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card  card-compact dropdown-content bg-base-100 z-1 mt-3 w-60 shadow"
              >
                {notifications.length > 0 && (
                  <div className="card-body p-2">
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-700 p-1 rounded-md bg-base-300 my-1"
                      >
                        <h5 className="truncate font-medium">
                          {" "}
                          {notification.title}
                        </h5>
                        <p className="truncate">
                          Status: {notification.category}
                        </p>
                        <p className="truncate">
                          Date & Time:
                          {new Date(notification.timeStamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <ThemeToggle />
            <button onClick={() => userSignOut()} className="btn btn-sm">
              Sign out
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
