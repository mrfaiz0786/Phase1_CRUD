import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api/users";

  // READ ✅ (CHANGE HERE)
  const getUsers = async () => {
    const res = await fetch(API);
    const result = await res.json();

    // 🔥 backend sends { success, data }
    setUsers(result.data || []);
  };

  // CREATE + UPDATE
  const submitHandler = async () => {
    if (!name || !email ||!password) {
      alert("All fields required");
      return;
    }

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email ,password}),
      });
      setEditId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email ,password}),
      });
    }

    setName("");
    setEmail("");
    setPassword("");
    getUsers();
  };

  // DELETE
  const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getUsers();
  };

  // EDIT
  const editUser = (user) => {
    setEditId(user._id);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password)
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">CRUD App</h2>

        {/* FORM */}
        <div className="space-y-3">
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={submitHandler}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            {editId ? "Update User" : "Add User"}
          </button>
        </div>

        {/* USER LIST */}
        <ul className="mt-5 space-y-3">
          {users.map((u) => (
            <li
              key={u._id}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
            >
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>

              <div className="space-x-2">
                <button onClick={() => editUser(u)} className="text-blue-500">
                  Edit
                </button>

                <button
                  onClick={() => deleteUser(u._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
