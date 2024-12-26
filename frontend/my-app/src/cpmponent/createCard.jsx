import React, { useState } from "react";
import { useAuth } from "../context/authprovider";

const CreateCard = () => {
  const { token } = useAuth(); // Retrieve token from context
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [information, setInformation] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!title || !category || !information || !image) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://mern-wt.onrender.com/api/cards/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
        body: JSON.stringify({
          title,
          category,
          information,
          image,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Card created successfully!");
        setTitle("");
        setCategory("");
        setInformation("");
        setImage("");
      } else {
        setError(data.message || "Error creating card.");
      }
    } catch (err) {
      console.error("Error during card creation:", err);
      setError("An error occurred while creating the card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute flex flex-wrap gap-20 top-20 justify-around p-10 left-0 z-[3] w-full">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Create a New Card</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {/* Category Input */}
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="rain">Rain</option>
            </select>
          </div>
          {/* Information Input */}
          <div>
            <label className="block text-gray-700">Information</label>
            <textarea
              value={information}
              onChange={(e) => setInformation(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              rows="4"
              required
            />
          </div>
          {/* Image Input */}
          <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter image URL"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Card"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
