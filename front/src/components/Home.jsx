import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Home = () => {
  const { logOut, isLoggedIn, currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Home page \o/</h1>
      {isLoggedIn && (
        <>
          <h1>Je suis connecté avec {currentUser && currentUser.name}</h1>
          <button onClick={logOut}>LogOut</button>
        </>
      )}
    </div>
  );
};

export default Home;
