import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authprovider";

const Dashboard = () => {
  const { user, setUser } = useAuth(); // Assuming user and setUser are in context
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch("https://mern-wt.onrender.com/api/users/logout", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      if (response.ok) {
        console.log("Logged out successfully");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null); // Fallback in case of a failed request
      navigate("/login");
    }
  };
  



  return (
    <div className="absolute w-full flex min-h-screen z-[10] bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-600 text-white p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-10">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-6">
              <Link to="create" className="text-lg font-semibold hover:text-blue-300">
                Create Card
              </Link>
            </li>
            <li className="mb-6">
              <Link to="update" className="text-lg font-semibold hover:text-blue-300">
                Update Card
              </Link>
            </li>
            <li className="mb-6">
              <Link to="delete" className="text-lg font-semibold hover:text-blue-300">
                Delete Card
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, {user ? (user.role === "admin" ? "Admin" : user.name) : "User"}!
          </h1>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Data */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-4">My Profile</h2>
          {error && <p className="text-red-500">{error}</p>}
          {profile ? (
            <div>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
            </div>
          ) : (
            <p>Loading profile data...</p>
          )}
        </div>

        {/* Content Area */}
        <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
          <Outlet /> {/* This renders Create, Update, or Delete page */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
