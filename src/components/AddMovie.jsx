import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { addMovie } from "../services/api";

export default function AddMovie({ onClose, onMovieAdded }) {
  // ---------------------------
  // Estado do formulário
  // ---------------------------
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [watched, setWatched] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------
  // Função para enviar o formulário
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita reload da página

    // validação simples
    if (!title || !year || !genre) {
      setError("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const newMovie = {
        title,
        year: Number(year),
        genre,
        rating: Number(rating) || 0,
        watched,
      };

      // chama a API para adicionar
      const addedMovie = await addMovie(newMovie);

      // chama função do componente pai para atualizar a lista
      if (onMovieAdded) onMovieAdded(addedMovie);

      // limpa o formulário
      setTitle("");
      setYear("");
      setGenre("");
      setRating("");
      setWatched(false);
      setError("");

      // fecha o modal
      if (onClose) onClose();
    } catch (err) {
      console.error("Erro ao adicionar filme:", err);
      setError("Erro ao adicionar filme. Tente novamente.");
    }
  };

  // prevent server/client markup mismatch and make sure document exists
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-lg max-h-[90vh] overflow-auto bg-gray-900/95 rounded-xl p-6 shadow-2xl border border-white/10">
        <h2 style={{
          fontFamily: 'Bungee',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }} className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
          ➕ Adicionar Novo Filme
        </h2>

        {error && <p className="text-red-400 bg-red-900/20 p-3 rounded mb-4 border border-red-500/20">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Ex: O Poderoso Chefão"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Ano</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              placeholder="Ex: 1972"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Gênero</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              placeholder="Ex: Drama, Ação, Comédia"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Rating (1-10)</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min={0}
              max={10}
              required
              placeholder="0-10"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={watched}
              onChange={(e) => setWatched(e.target.checked)}
              className="w-5 h-5 rounded border-gray-400 bg-white/5 text-yellow-400 focus:ring-yellow-500/40"
            />
            <label className="text-gray-200">Visto</label>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              style={{
                fontFamily: 'Bungee',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
              className="flex-1 px-4 py-2 bg-green-500/90 hover:bg-green-600 text-yellow-400 rounded font-semibold transition transform hover:scale-105"
            >
              Adicionar
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                fontFamily: 'Bungee',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
              className="flex-1 px-4 py-2 bg-gray-700/90 hover:bg-gray-600 text-yellow-400 rounded font-semibold transition transform hover:scale-105"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
