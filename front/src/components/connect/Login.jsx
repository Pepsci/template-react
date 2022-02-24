import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { AuthContext } from "../../context/auth.context";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [erroMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    authenticateUser();
    if (isLoggedIn) navigate("/home");
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dbResponse = await apiHandler.post("/login", user);

      // store the jwt token in local storage
      storeToken(dbResponse.data.authToken);

      //verify the token
      authenticateUser();

      // redirect to home
      navigate("/");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="form-connect">
      <h1>Login</h1>
      <form action="" className="form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="form-input"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="text"
          name="password"
          id="password"
          className="form-input"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button>Login</button>
      </form>

      {erroMessage && <p className="error-message">{errorMessage}</p>}

      <Link to={"/"}>
        <span className="form-connect-msg">Don't have an account yet?</span>
      </Link>
    </div>
  );
};

export default Login;
