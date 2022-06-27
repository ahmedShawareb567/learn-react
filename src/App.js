import "./App.css";
import { useState, useEffect, useDeferredValue } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { Login } from "./components/Auth/Login";
import Users from "./JSON/Users.json";

function App() {
  const [user, setUser] = useState(null);

  const loginFormData = (data) => {
    const currentUser = Users.data.find(
      (i) => i.email == data.email && i.password == data.password
    );

    if (currentUser) {
      localStorage.setItem("token", JSON.stringify(currentUser));
      setUser(currentUser);
    }
  };

  const loginForm = (
    <div className="col-lg-5 col-md-8">
      <Login fireAction={loginFormData} />
    </div>
  );

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setUser({
        ...JSON.parse(token),
      });
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const client = new ApolloClient({
    uri: "https://staging-api.trwej.com/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="container">
          <div className="row justify-content-center">
            {!user && loginForm}
            {user && (
              <div className="col-4 pt-5">
                <p>{user.email}</p>
                <button className="btn btn-danger btn-block" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
