import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Correct import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function
  const login = async (email, password, roll) => {
    try {
      const response = await axios.post("https://mern-wt.onrender.com/api/users/login", {
        email,
        password,
        roll,
      });
  
      if (response.status === 200) {
        const { token, user } = response.data;
        setToken(token);
        localStorage.setItem("token", token);
        setUser(user);  // Make sure you are setting the user in context
        return user;
      }
    } catch (err) {
      console.error("Error during login:", err);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };
  

  // Token validation
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (err) {
      console.error("Token decoding error:", err);
      return false;
    }
  };

  // Fetch cards when the token is valid
  useEffect(() => {
    const fetchCards = async () => {
      if (!token || !isTokenValid(token)) {
        setError("Invalid or expired token. Please log in again.");
        setCards([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get("https://mern-wt.onrender.com/api/cards/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCards(response.data);
        setError(null); // Clear any previous error
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch cards.");
        console.error("Error fetching cards:", err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, cards, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
