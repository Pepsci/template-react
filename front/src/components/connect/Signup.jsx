import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [erroMessage, setErrorMessage] = useState(undefined);
  const { authenticateUser, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    authenticateUser();
    if (isLoggedIn) navigate("/home");
  }, [isLoggedIn]);

  const avatarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    authenticateUser();
    if (isLoggedIn) navigate("/home");
  }, [isLoggedIn]);

  const handleAvatar = (input) => {
    axios
      .get(`https://avatars.dicebear.com/api/bottts/${input}.svg`)
      .then(({ data }) => {
        avatarRef.current = data;
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiHandler.post("/signup", user);
      navigate("/login");
    } catch (err) {
      setErrorMessage((prevValue) => err.response.data.message);
      console.error(err);
    }
  };

  return (
    <div className="form-connect">
      <h1>Signup</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-input"
          placeholder="Enter your name"
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
            handleAvatar(e.target.value);
          }}
        />

        <label htmlFor="surname" className="form-label">
          Surname
        </label>
        <input
          type="text"
          name="surname"
          id="surname"
          className="form-input"
          placeholder="Enter your surname"
          value={user.surname}
          onChange={(e) => {
            setUser({ ...user, surname: e.target.value });
          }}
        />

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
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
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
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <div className="form-connect-avatar">
          <span className="form-connect-msg">This will be your avatar</span>
          <img
            src={`https://avatars.dicebear.com/api/bottts/${user.name}.svg`}
            alt=""
          />
        </div>
        <button>Sign up</button>
      </form>

      {erroMessage && <p className="error-message">{erroMessage}</p>}

      <Link to={"/login"}>
        <span className="form-connect-msg">Already have an account ?</span>
      </Link>
    </div>
  );
};

export default Signup;
