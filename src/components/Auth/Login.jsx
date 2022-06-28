import { useState } from "react";
import { Loader } from "../Loader";

export const Login = ({ fireAction, isLoading }) => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const fireFormData = (e) => {
    e.preventDefault();
    fireAction({
      phone: phone.replace(/ /g, ""),
      password,
    });
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  return (
    <>
      <h3 className="pt-5">Login</h3>
      <form>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Email.."
          onChange={changePhone}
          defaultValue={phone}
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password .. "
          onChange={changePassword}
          defaultValue={password}
        />
        <button className="btn btn-primary" onClick={fireFormData}>
          <div className="d-flex justify-content-center align-items-center">
            {!isLoading && <span>Login</span>}
            {isLoading && <Loader color="white" />}
          </div>
        </button>
      </form>
    </>
  );
};

Login.defaultProps = {
  isLoading: false,
};
