import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import Recipe from "./models/Recipe.js";

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
  const recipes = await Recipe.find({});
  res.json(recipes);
});

app.post("/api/recipes", async (req, res) => {
  const recipe = new Recipe(req.body);
  const savedRecipe = await recipe.save();
  res.json(savedRecipe);
});

app.delete("/api/recipes/:id", async (req, res) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
  res.json(deletedRecipe);
});

app.put("/api/recipes/:id", async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.json(updatedRecipe);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
