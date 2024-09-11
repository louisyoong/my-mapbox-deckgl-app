import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  // State for storing form inputs and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hardcoded credentials
  const correctUsername = "admin";
  const correctPassword = "123456";

  // Handle form submission
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if credentials match
    if (username === correctUsername && password === correctPassword) {
      // Set login status in localStorage
      localStorage.setItem("isLoggedIn", true);

      // Redirect to homepage if successful
      router.push("/");
    } else {
      // Show error message if failed
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-4 shadow-lg rounded-md bg-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errorMessage && (
          <div className="text-red-600 mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm text-slate-700"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm text-slate-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
