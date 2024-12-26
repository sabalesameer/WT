import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authprovider";
import { jwtDecode } from "jwt-decode";

const Winter = () => {
  const { loading, error, token } = useAuth();
  const [cards, setCards] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Validate token and check for expiration
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          setIsTokenExpired(true);
        } else {
          setIsTokenExpired(false);
        }
      } catch (err) {
        setIsTokenExpired(true);
      }
    }
  }, [token]);

  // Fetch all cards and filter for the "winter" category
  useEffect(() => {
    if (token && !isTokenExpired) {
      setIsFetching(true);
      fetch("http://localhost:5000/api/cards/winter", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 401) throw new Error("Unauthorized: Invalid token.");
            if (response.status === 403) throw new Error("Forbidden: Access denied.");
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const winterCards = data.filter((card) => card.category === "winter");
            if (winterCards.length > 0) {
              setCards(winterCards);
            } else {
              setFetchError("No winter cards available.");
            }
          } else {
            setFetchError("Invalid data format.");
          }
        })
        .catch((error) => {
          setFetchError("Failed to fetch cards: " + error.message);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [token, isTokenExpired]);

  // Render conditions
  if (loading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (isTokenExpired) return <div className="text-red-500">Session expired. Please log in again.</div>;
  if (fetchError) return <div className="text-red-500">{fetchError}</div>;
  if (!cards || cards.length === 0) return <div>No winter cards available.</div>;

  return (
    <div className="absolute flex flex-wrap gap-20 top-20 justify-around p-10 left-0 z-[3] w-full">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-4xl font-bold text-center text-white mb-8">Winter Cards</h1> */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <li
              key={card._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div
                className="bg-cover bg-center h-56 mb-6"
                style={{ backgroundImage: `url(${card.image})` }}
              ></div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">{card.title}</h2>
                <p className="text-gray-600 text-base">{card.information}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Winter;
