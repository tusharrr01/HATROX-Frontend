import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  // Register form state
  const [fullname, setFullname] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Shared state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /** Handle Registration */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!fullname || !regEmail || !regPassword) {
      setError("Please fill in all registration fields.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        fullname,
        email: regEmail,
        password: regPassword
      });
      setSuccess("Account created successfully! You can now log in.");
      setFullname("");
      setRegEmail("");
      setRegPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /** Handle Login */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!loginEmail || !loginPassword) {
      setError("Please fill in all login fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email: loginEmail,
        password: loginPassword
      });
      localStorage.setItem("token", res.data.token);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/shop"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {/* Success Banner */}
      <div
        className={`fixed bottom-5 right-5 px-4 py-2 rounded-md bg-blue-500 text-white shadow-lg transform transition-all duration-500 ease-in-out
              ${success ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        {success}
      </div>

      {/* Error Toast */}
      <div
        className={`fixed bottom-5 right-5 px-4 py-2 rounded-md bg-red-500 text-white shadow-lg transform transition-all duration-500 ease-in-out
              ${error ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        {error}
      </div>

      

      <div className="w-full h-screen flex px-20">
        {/* Register Section */}
        <div className="w-1/2 flex items-center justify-center h-screen">
          <div className="w-full px-32">
            <h3 className="text-4xl">
              welcome to <span className="text-blue-400 font-semibold">HATROX</span>
            </h3>
            <h4 className="text-2xl mb-5">create your account</h4>
            <form autoComplete="off" onSubmit={handleRegister}>
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white disabled:opacity-70"
              >
                {loading ? "Processing..." : "Create My Account"}
              </button>
            </form>
          </div>
        </div>

        {/* Login Section */}
        <div className="w-1/2 flex items-center justify-center h-screen">
          <div className="w-full px-32">
            <h4 className="text-2xl capitalize mb-5">login your account</h4>
            <form autoComplete="off" onSubmit={handleLogin}>
              <input
                className="block bg-zinc-100 w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                className="block bg-zinc-100 w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 block rounded-full py-3 mt-2 bg-blue-500 text-white disabled:opacity-70"
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

export default Register;
