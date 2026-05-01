import React, { useState } from "react";
import "./App.css";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div className="container">
      {!loggedIn ? (
        <AuthPage setLoggedIn={setLoggedIn} />
      ) : (
        <Dashboard setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;