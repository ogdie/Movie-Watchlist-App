import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  genre: String,
  rating: Number,
  watched: Boolean,
});

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
