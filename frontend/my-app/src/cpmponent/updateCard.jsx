import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authprovider";

const UpdateCard = () => {
  const { token } = useAuth(); // Authentication token
  const [idInput, setIdInput] = useState(""); // ID entered by user
  const [card, setCard] = useState(null); // Card data
  const [title, setTitle] = useState("");
  const [information, setInformation] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Fetch card details based on the provided ID
  const handleFetchCard = async () => {
    if (!idInput) {
      setError("Please enter a valid ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`https://mern-wt.onrender.com/cards/getone/${idInput}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Card not found.");
      }

      const cardData = await response.json();
      setCard(cardData);
      setTitle(cardData.title || "");
      setInformation(cardData.information || "");
      setImage(cardData.image || "");
    } catch (err) {
      setError(err.message || "An error occurred while fetching the card.");
      setCard(null);
    } finally {
      setLoading(false);
    }
  };

  // Update the card with the new data
  const handleUpdateCard = async (e) => {
    e.preventDefault();

    if (!title || !information || !image) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`https://mern-wt.onrender.com/api/cards/update/${idInput}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, information, image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update the card.");
      }

      setSuccess("Card updated successfully!");
      navigate("/dashboard"); // Redirect or refresh as needed
    } catch (err) {
      setError(err.message || "An error occurred while updating the card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Update Card</h1>
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* ID Input Section */}
        {!card && (
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Enter Card ID:
            </label>
            <input
              type="text"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Card ID"
            />
            <button
              onClick={handleFetchCard}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {loading ? "Fetching..." : "Fetch Card"}
            </button>
          </div>
        )}

        {/* Update Form */}
        {card && (
          <form onSubmit={handleUpdateCard} className="space-y-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700">Information</label>
              <textarea
                value={information}
                onChange={(e) => setInformation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700">Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {loading ? "Updating..." : "Update Card"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateCard;
