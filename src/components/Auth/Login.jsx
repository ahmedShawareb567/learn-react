import { useState } from "react";
import { Loader } from "../Loader";
import PhoneInput from "react-phone-input-2";

export const Login = ({ fireAction, isLoading }) => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const fireFormData = (e) => {
    e.preventDefault();
    fireAction({
      phone: `+${phone.replace(/ /g, "")}`,
      password,
    });
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changePhone = (value) => {
    setPhone(value);
  };

  return (
    <>
      <h3 className="pt-5 mb-4">Login</h3>
      <form>
        <PhoneInput
          country={"eg"}
          value={phone}
          onChange={changePhone}
          className="mb-2"
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
