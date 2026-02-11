import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: String, required: true },
});

export default mongoose.model("Recipe", recipeSchema);
