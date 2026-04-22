import express from "express";
import {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  purchaseItem,
} from "../controllers/storeController.js";

const router = express.Router();

router.get("/", getAllItems);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.post("/purchase/:id", purchaseItem);

export default router;