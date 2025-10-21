import express from "express";
import next from "next";
import dotenv from "dotenv";
import Movie from "./models/Movie.js";
import { connectDB } from "./lib/mongodb.js";

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

connectDB();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  // ---------------------------
  // Rotas da API
  // ---------------------------
  server.get("/api/movies", async (req, res) => {
    const { watched, sortBy, order } = req.query;
    try {
      let query = {};
      if (watched !== undefined) query.watched = watched === "true";
      
      let moviesQuery = Movie.find(query);
      if (sortBy) moviesQuery = moviesQuery.sort({ [sortBy]: order === "desc" ? -1 : 1 });
      
      const movies = await moviesQuery;
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  server.post("/api/movies", async (req, res) => {
    try {
      const movie = await Movie.create(req.body);
      res.json(movie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  server.put("/api/movies/:id", async (req, res) => {
    try {
      const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  server.delete("/api/movies/:id", async (req, res) => {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.json({ message: "Filme deletado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
  });
});
