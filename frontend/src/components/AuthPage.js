import React, { useState } from "react";
import API from "../api";

export default function AuthPage({ setLoggedIn }) {

  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleSubmit = async () => {

    setLoading(true);
    setMsg({ text: "", type: "" });

    try {

      if (isLogin) {
        // LOGIN
        const res = await API.post("/auth/login", data);

        const token = res.data.token;

        localStorage.setItem("token", token);

        const payload = JSON.parse(atob(token.split(".")[1]));
        localStorage.setItem("role", payload.role);

        setMsg({ text: "Login successful!", type: "success" });

        setTimeout(() => setLoggedIn(true), 500);

      } else {
        //REGISTER
        const res = await API.post("/auth/register", data);

        setMsg({ text: res.data, type: "success" });

        setIsLogin(true);
        setData({ username: "", password: "" });
      }

    } catch (err) {

      console.log(err);

      const errorMsg =
        err.response?.data ||
        err.response?.data?.message ||
        "Something went wrong";

      setMsg({
        text: errorMsg,
        type: "error"
      });
    }

    setLoading(false);
  };

  return (
    <div className="card">

      <h2>{isLogin ? "Login" : "Register"}</h2>

      <input
        placeholder="Username"
        value={data.username}
        onChange={(e) =>
          setData({ ...data, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading
          ? "Processing..."
          : isLogin
          ? "Login"
          : "Register"}
      </button>

      {msg.text && (
        <div className={`msg ${msg.type}`}>
          {msg.text}
        </div>
      )}

      <div
        className="switch"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </div>

    </div>
  );
}