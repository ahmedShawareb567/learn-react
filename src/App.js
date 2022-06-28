import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { Login as loginMutation } from "./graphql/mutations/Auth";
import { Me as currentUserQuery } from "./graphql/queries/User";
import { Login } from "./components/Auth/Login";
import { Loader } from "./components/Loader";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ilLoading, setIlLoading] = useState(false);
  const [token, setToken] = useState(() => {
    const iToken = localStorage.getItem("token");
    if (iToken) {
      setLoading(true);
      return iToken;
    }
    setLoading(false);
    return null;
  });

  const loginFormData = async (data) => {
    try {
      setIlLoading(true);
      const {
        data: { phoneAndEmailLogin },
      } = await client.mutate({
        mutation: loginMutation,
        variables: {
          input: {
            phone: data.phone,
            password: data.password,
            device: "DESKTOP",
          },
        },
      });

      if (phoneAndEmailLogin.success) {
        setUser(phoneAndEmailLogin.data);
        localStorage.setItem("token", phoneAndEmailLogin.data.token);
        toast.success(phoneAndEmailLogin.message, {
          position: "top-right",
        });
      } else {
        toast.error(phoneAndEmailLogin.message, {
          position: "top-right",
        });
      }

      setIlLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const loginForm = (
    <div className="col-lg-5 col-md-8">
      <Login fireAction={loginFormData} isLoading={ilLoading} />
    </div>
  );

  const userIsHere = useCallback(async () => {
    if (token) {
      const {
        data: { me },
      } = await client.query({
        query: currentUserQuery,
      });

      if (me.data) {
        setUser(me.data);
      }

      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    userIsHere();
  }, [userIsHere]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="container">
          <div className="row justify-content-center">
            {loading && (
              <div className="col-lg-12 py-4">
                <Loader />
              </div>
            )}
            {!user && !loading && loginForm}
            {user && (
              <div className="col-lg-5 pt-5">
                <div className="profile">
                  <div className="profile-image">
                    <img src={user.profilePicture} alt="profile" />
                  </div>
                  <div className="profile-details">
                    <h4>{user.verifiedPhone}</h4>
                  </div>
                </div>
                <pre className="pre mt-4">{JSON.stringify(user)}</pre>
                <button className="btn btn-danger btn-block" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </ApolloProvider>
  );
}

export default App;
