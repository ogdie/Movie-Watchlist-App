import { connectDB } from "../../../../lib/mongodb";
import Movie from "../../../../models/Movie";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const { watched, sortBy, order } = req.query;

      // Filtro por watched
      let filter = {};
      if (watched === "true") filter.watched = true;
      if (watched === "false") filter.watched = false;

      // Ordenação
      let sort = {};
      if (sortBy) sort[sortBy] = order === "desc" ? -1 : 1;

      const movies = await Movie.find(filter).sort(sort);
      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      return res.status(500).json({ error: "Erro ao buscar filmes" });
    }
  }

  if (req.method === "POST") {
    try {
      const newMovie = await Movie.create(req.body);
      return res.status(201).json(newMovie);
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
