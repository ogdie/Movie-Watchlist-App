import { useState } from "react";
import { deleteMovie, editMovie } from "../services/api";
import EditMovie from "./EditMovie";

export default function AllMovies({ movies, setMovies, refreshMovies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function handleDelete(id) {
    try {
      await deleteMovie(id);
      await refreshMovies(); // 🔄 Recarrega a lista
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
    }
  }

  async function handleToggleWatched(movie) {
    try {
      const updatedMovie = await editMovie(movie._id, { watched: !movie.watched });
      setMovies(movies.map(m => (m._id === movie._id ? updatedMovie : m)));
    } catch (error) {
      console.error("Erro ao atualizar status do filme:", error);
    }
  }

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
  };

  const handleEditClose = () => {
    setSelectedMovie(null);
  };

  const handleMovieUpdate = async (updatedMovie) => {
    setMovies(movies.map(m => m._id === updatedMovie._id ? updatedMovie : m));
    setSelectedMovie(null);
    await refreshMovies(); // 🔄 Garante sincronismo
  };

  return (
    <div className="text-white">
      <h2 style={{
        fontFamily: 'Bungee',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
      }} className="text-2xl font-bold mb-6 text-yellow-400">
        🎬 Todos os Filmes
      </h2>

      {movies.length === 0 && <p style={{
        fontFamily: 'Bungee',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
      }} className="text-yellow-400 text-lg">
        Nenhum filme encontrado.
      </p>}

      {movies.map(movie => (
        <div key={movie._id} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-4 border border-white/20 hover:bg-white/20 transition-all">
          <p style={{
            fontFamily: 'Bungee',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }} className="text-xl font-semibold text-yellow-400">
            {movie.title} <span className="text-gray-300">({movie.year})</span>
          </p>
          <p style={{
            fontFamily: 'Bungee',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }} className="text-yellow-400 mt-2">
            Gênero: {movie.genre}
          </p>
          <p style={{
            fontFamily: 'Bungee',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }} className="text-yellow-400 font-medium mt-1">
            ⭐ Avaliação: {movie.rating}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <label className="flex items-center gap-2" style={{
                fontFamily: 'Bungee',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}>
              <input
                type="checkbox"
                checked={movie.watched}
                onChange={() => handleToggleWatched(movie)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-yellow-400 text-sm">Visto</span>
            </label>

            <p style={{
                fontFamily: 'Bungee',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }} className="text-sm">
              <span className="text-yellow-400">Status:</span> <span className={movie.watched ? "text-green-400" : "text-yellow-300"}>{movie.watched ? "Visto ✅" : "Por ver ⏳"}</span>
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleEdit(movie)}
              style={{
                fontFamily: 'Bungee',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
              className="px-4 py-2 bg-blue-500/90 hover:bg-blue-500 text-yellow-400 rounded-md text-sm font-bold hover:scale-105 transition-all border border-blue-400/30 shadow-lg hover:shadow-blue-500/30 backdrop-blur-sm"
            >
              ✏️ Editar
            </button>
            <button
              onClick={() => handleDelete(movie._id)}
              style={{
                fontFamily: 'Bungee',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
              className="px-4 py-2 bg-red-500/90 hover:bg-red-500 text-yellow-400 rounded-md text-sm font-bold hover:scale-105 transition-all border border-red-400/30 shadow-lg hover:shadow-red-500/30 backdrop-blur-sm"
            >
              🗑️ Excluir
            </button>
          </div>
        </div>
      ))}

      {selectedMovie && (
        <EditMovie
          movie={selectedMovie}
          onClose={handleEditClose}
          onMovieUpdated={handleMovieUpdate}
        />
      )}
    </div>
  );
}
