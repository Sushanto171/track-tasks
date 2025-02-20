/* eslint-disable react/prop-types */
import { useEffect } from "react";
import SocialLogin from "../components/SocialLogin";

const AuthModal = ({ user }) => {
  useEffect(() => {
    if (!user) {
      document.getElementById("my_modal_5").showModal();
    } else {
      document.getElementById("my_modal_5").closeModal();
    }
  }, [user]);
  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">Login</legend>

            <label className="fieldset-label ">Email</label>
            <input type="email" className="input w-full" placeholder="Email" />

            <label className="fieldset-label ">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
            />

            <button className="btn btn-neutral mt-4">Login</button>

            <SocialLogin />
          </fieldset>
        </div>
      </dialog>
    </>
  );
};

export default AuthModal;
