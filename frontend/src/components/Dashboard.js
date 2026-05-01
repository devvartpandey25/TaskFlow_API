import React, { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard({ setLoggedIn }) {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem("role");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      // token expired / invalid
      localStorage.clear();
      setLoggedIn(false);
    }
  };

  const addTask = async () => {
    if (!title) return;

    setLoading(true);

    try {
      await API.post("/tasks", {
        title,
        description: "demo"
      });

      setTitle("");
      fetchTasks();

    } catch {
      alert("Error adding task");
    }

    setLoading(false);
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      alert("Delete failed (Admin only)");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">

      <h2>Dashboard</h2>

      <button
        onClick={() => {
          localStorage.clear();
          setLoggedIn(false);
        }}
      >
        Logout
      </button>

      <input
        value={title}
        placeholder="Add task"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask} disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>

      {tasks.map((task) => (
        <div key={task.id} className="task">
          {task.title}

          {role === "ROLE_ADMIN" && (
            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          )}
        </div>
      ))}

    </div>
  );
}