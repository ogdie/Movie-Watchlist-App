"use client";

import useSWR from "swr";
import { deleteMovie, editMovie } from "../services/api";

export default function WatchedMovies({ onEdit }) {
  const textStyle = {
    fontFamily: 'Bungee',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
  };

  const fetcher = async () => {
    const data = await fetch("/api/movies?watched=true").then(res => res.json());
    return data;
  };

  const { data: movies = [], mutate } = useSWR("/api/movies?watched=true", fetcher);

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      mutate(); // atualiza a lista
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
    }
  };

  const handleToggleWatched = async (movie) => {
    try {
      await editMovie(movie._id, { watched: !movie.watched });
      mutate(); // atualiza a lista; se o filme agora não estiver mais "visto", ele sai da lista
    } catch (error) {
      console.error("Erro ao atualizar status do filme:", error);
    }
  };

  return (
    <div className="text-white">
      <h2 style={textStyle} className="text-2xl font-bold mb-6 text-yellow-400">
        🎬 Filmes Vistos
      </h2>

      {movies.length === 0 && (
        <p style={textStyle} className="text-yellow-400 text-lg">
          Nenhum filme visto ainda.
        </p>
      )}

      {movies.map(movie => (
        <div key={movie._id} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-4 border border-white/20 hover:bg-white/20 transition-all">
          <p style={textStyle} className="text-xl font-semibold text-yellow-400">
            {movie.title} <span className="text-gray-300">({movie.year})</span>
          </p>
          <p style={textStyle} className="text-yellow-400 mt-2">
            Gênero: {movie.genre}
          </p>
          <p style={textStyle} className="text-yellow-400 font-medium mt-1">
            ⭐ Avaliação: {movie.rating}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <label className="flex items-center gap-2" style={textStyle}>
              <input
                type="checkbox"
                checked={movie.watched}
                onChange={() => handleToggleWatched(movie)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-yellow-400 text-sm">Visto</span>
            </label>

            <p style={textStyle} className="text-sm">
              <span className="text-yellow-400">Status:</span>{" "}
              <span className={movie.watched ? "text-green-400" : "text-yellow-300"}>
                {movie.watched ? "Visto ✅" : "Por ver ⏳"}
              </span>
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(movie)}
              style={textStyle}
              className="px-4 py-2 bg-blue-500/90 hover:bg-blue-500 text-yellow-400 rounded-md text-sm font-bold hover:scale-105 transition-all border border-blue-400/30 shadow-lg hover:shadow-blue-500/30 backdrop-blur-sm"
            >
              ✏️ Editar
            </button>
            <button
              onClick={() => handleDelete(movie._id)}
              style={textStyle}
              className="px-4 py-2 bg-red-500/90 hover:bg-red-500 text-yellow-400 rounded-md text-sm font-bold hover:scale-105 transition-all border border-red-400/30 shadow-lg hover:shadow-red-500/30 backdrop-blur-sm"
            >
              🗑️ Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
