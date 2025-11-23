import { connectDB } from "../../../lib/mongodb";
import Movie from "../../../models/Movie";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (req.method === "GET") {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ error: "Filme não encontrado" });
    return res.status(200).json(movie);
  }

  if (req.method === "PUT") {
    try {
      const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(movie);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Movie.findByIdAndDelete(id);
      return res.status(200).json({ message: "Filme removido" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
