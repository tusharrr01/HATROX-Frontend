import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OwnerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/owners/login`,
        { email, password }
      );

      // Store JWT token for authentication
      localStorage.setItem("token", res.data.token);

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/admin"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      {/* Error Message */}
      {error && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 p-3 rounded-md bg-red-500">
          <span className="inline-block mt-1 mb-1 text-white">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 p-3 rounded-md bg-blue-500">
          <span className="inline-block mt-1 mb-1 text-white">{success}</span>
        </div>
      )}

      <div className="w-full h-screen flex px-20">
        <div className="w-1/2 flex items-center justify-center h-screen">
          <div className="w-full px-32">
            <h4 className="text-2xl capitalize mb-5">Admin Access</h4>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <input
                className="block bg-zinc-100 w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="block bg-zinc-100 w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}

export default OwnerLogin;
