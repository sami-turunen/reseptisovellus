import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import Receipt from "./models/Recipe.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.get("/api/recipes", async (req, res) => {
  const receipts = await Receipt.find({});
  res.json(receipts);
});

app.post("/api/recipes", async (req, res) => {
  const receipt = new Receipt(req.body);
  const savedReceipt = await receipt.save();
  res.json(savedReceipt);
});

app.delete("/api/recipes/:id", async (req, res) => {
  const deletedReceipt = await Receipt.findByIdAndDelete(req.params.id);
  res.json(deletedReceipt);
});

app.put("/api/recipes/:id", async (req, res) => {
  const updatedReceipt = await Receipt.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.json(updatedReceipt);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
