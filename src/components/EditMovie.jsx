import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { editMovie } from "../services/api";

export default function EditMovie({ movie, onClose, onMovieUpdated }) {
  // ---------------------------
  // Estados do formulário inicializados com os valores do filme
  // ---------------------------
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(1);
  const [watched, setWatched] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // ---------------------------
  // Preenche os estados quando o componente monta ou quando o filme muda
  // ---------------------------
  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setYear(movie.year);
      setGenre(movie.genre);
      setRating(movie.rating);
      setWatched(movie.watched);
    }
  }, [movie]);

  // ---------------------------
  // useEffect para prevenção de erro de hidratação
  // ---------------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  // ---------------------------
  // Função para enviar o formulário
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !year || !genre) {
      setError("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const updatedData = {
        title,
        year: Number(year),
        genre,
        rating: Number(rating),
        watched,
      };

      // Chama a API para editar o filme
      const updatedMovie = await editMovie(movie._id, updatedData);

      // Atualiza a lista no componente pai
      if (onMovieUpdated) onMovieUpdated(updatedMovie);

      // Limpa o erro e fecha o modal
      setError("");
      if (onClose) onClose();
    } catch (err) {
      console.error("Erro ao editar filme:", err);
      setError("Erro ao atualizar filme. Tente novamente.");
    }
  };

  if (!mounted) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-lg max-h-[90vh] overflow-auto bg-gray-900/95 rounded-xl p-6 shadow-2xl border border-white/10">
        <h2 style={{
          fontFamily: 'Bungee',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }} className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
          ✏️ Editar Filme
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
              className="flex-1 px-4 py-2 bg-blue-500/90 hover:bg-blue-600 text-yellow-400 rounded font-semibold transition transform hover:scale-105"
            >
              Salvar
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