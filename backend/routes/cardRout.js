import express from "express";
import {
  createCard,
  updateCard,
  deleteCard,
  getSummerCard,
  getWinterCard,
  getRainCard,
  getAllCards,
  getOneCard
} from "../controll/cardControl.js";

const router = express.Router();

router.post("/create", createCard);
router.get("/all", getAllCards);
router.get("/summer", getSummerCard);
router.get("/winter", getWinterCard);
router.get("/rain", getRainCard);
router.put("/update/:id", updateCard);
router.delete("/delete/:id", deleteCard);
router.get('/getone/:id', getOneCard);

export default router;
