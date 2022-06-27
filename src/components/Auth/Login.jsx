import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

export const Login = ({ fireAction }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const fireFormData = (e) => {
    e.preventDefault();
    fireAction({
      email,
      password,
    });
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const ads = gql`
    {
      advertisements {
        data {
          items {
            id
            title
            description
            store {
              id
              name
            }
          }
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(ads);

  const fetchAds = () => {
    console.log("fetch");
  };

  return (
    <>
      <h3 className="pt-5">Login</h3>
      <form>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Email.."
          onChange={changeEmail}
          defaultValue={email}
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password .. "
          onChange={changePassword}
          defaultValue={password}
        />
        <button className="btn btn-primary" onClick={fireFormData}>
          Login
        </button>
      </form>
      <button
        className="btn btn-danger btn-block w-100 mt-5"
        onClick={fetchAds}
      >
        Fetch Ads
      </button>
      <div>
        {loading && <p>Loading...</p>}
        {!loading && <pre className="pt-3">{JSON.stringify(data)}</pre>}
      </div>
    </>
  );
};
