import { connectDB } from "../../../../lib/mongodb"; // sobe 4 níveis até a raiz
import Movie from "../../../../models/Movie";       // sobe 4 níveis também

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const { watched, sortBy, order } = req.query;
    let filter = {};
    if (watched === "true") filter.watched = true;
    if (watched === "false") filter.watched = false;

    let sort = {};
    if (sortBy) sort[sortBy] = order === "desc" ? -1 : 1;

    const movies = await Movie.find(filter).sort(sort);
    return res.status(200).json(movies);
  }

  if (req.method === "POST") {
    try {
      const movie = await Movie.create(req.body);
      return res.status(201).json(movie);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
