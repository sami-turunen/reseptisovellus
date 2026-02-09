import mongoose from "mongoose";

const receiptSchema = mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: String, required: true },
});

export default mongoose.model("Receipt", receiptSchema);
