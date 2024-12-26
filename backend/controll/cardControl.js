import { Card } from "../models/cardData.js";

// Create a new card
export const createCard = async (req, res) => {
  try {
    const { title, information, category, image } = req.body;

    // Validate incoming data
    if (!title || !information || !category) {
      return res.status(400).json({ message: "Title, information, and category are required." });
    }

    // Create a new card
    const card = new Card({
      title,
      information,
      category,
      image,
    });

    // Save the card to the database
    await card.save();

    res.status(201).json({ message: "Card created successfully.", card });
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ message: "Error creating card.", error: error.message });
  }
};

// Get all cards
export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();

    if (!cards.length) {
      return res.status(404).json({ message: "No cards found." });
    }

    res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Error fetching cards.", error: error.message });
  }
};

// Get summer category cards
export const getSummerCard = async (req, res) => {
  try {
    const cards = await Card.find({ category: "summer" });

    if (!cards.length) {
      return res.status(404).json({ message: "No summer cards found." });
    }

    res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching summer cards:", error);
    res.status(500).json({ message: "Error fetching summer cards.", error: error.message });
  }
};

// Get winter category cards
export const getWinterCard = async (req, res) => {
  try {
    const cards = await Card.find({ category: "winter" });

    if (!cards.length) {
      return res.status(404).json({ message: "No winter cards found." });
    }

    res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching winter cards:", error);
    res.status(500).json({ message: "Error fetching winter cards.", error: error.message });
  }
};

// Get rain category cards
export const getRainCard = async (req, res) => {
  try {
    const cards = await Card.find({ category: "rain" });

    if (!cards.length) {
      return res.status(404).json({ message: "No rain cards found." });
    }

    res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching rain cards:", error);
    res.status(500).json({ message: "Error fetching rain cards.", error: error.message });
  }
};

// Update a card
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCard = await Card.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found." });
    }

    res.status(200).json({ message: "Card updated successfully.", updatedCard });
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ message: "Error updating card.", error: error.message });
  }
};

// Delete a card
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found." });
    }

    res.status(200).json({ message: "Card deleted successfully." });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ message: "Error deleting card.", error: error.message });
  }
};


// Get one single card
export const getOneCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }

    res.status(200).json(card);
  } catch (error) {
    console.error("Error fetching card:", error);
    res.status(500).json({ message: "Error fetching card.", error: error.message });
  }
};