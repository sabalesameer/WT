import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authprovider";

const DeleteCard = () => {
  const { token } = useAuth(); // Authentication token
  const [idInput, setIdInput] = useState(""); // ID entered by user
  const [card, setCard] = useState(null); // Card data
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
      const response = await fetch(`https://mern-wt.onrender.com/api/cards/getone/${idInput}`, {
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
    } catch (err) {
      setError(err.message || "An error occurred while fetching the card.");
      setCard(null);
    } finally {
      setLoading(false);
    }
  };

  // Delete the card
  const handleDelete = async () => {
    if (!card) {
      setError("No card found to delete.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`https://mern-wt.onrender.com/api/cards/delete/${card._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete the card.");
      }

      setCard(null); // Clear the card data after successful deletion
      setSuccess("Card deleted successfully!");
      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.message || "An error occurred while deleting the card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Delete Card</h1>
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

        {/* If card is found, show delete option */}
        {card && (
          <div>
            <p className="text-lg mb-4">
              <strong>Card Found:</strong>
            </p>
            <p><strong>Title:</strong> {card.title}</p>
            <p><strong>Information:</strong> {card.information}</p>
            <p><strong>Image:</strong> {card.image}</p>

            <button
              onClick={handleDelete}
              className={`w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition ${loading ? "bg-gray-400" : ""}`}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Card"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteCard;
