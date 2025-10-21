import { useState, useEffect } from "react";

// Importa todos os componentes de listagem
import AllMovies from "../components/AllMovies";
import WatchedMovies from "../components/WatchedMovies";
import NotWatchedMovies from "../components/NotWatchedMovies";
import MoviesByRating from "../components/MoviesByRating";

// Importa os modais de Add/Edit
import AddMovie from "../components/AddMovie";
import EditMovie from "../components/EditMovie";

export default function Home() {
  const [movies, setMovies] = useState([]);

  // carrega filmes ao montar
  useEffect(() => {
    async function load() {
      try {
        const { getAllMovies } = await import('../services/api');
        const data = await getAllMovies();
        setMovies(data);
      } catch (err) {
        console.error('Erro ao carregar filmes em Home:', err);
      }
    }
    load();
  }, []);

  // 🔄 Função para recarregar filmes
  async function refreshMovies() {
    try {
      const { getAllMovies } = await import('../services/api');
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      console.error('Erro ao recarregar filmes:', err);
    }
  }

  const [activeList, setActiveList] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setIsEditModalOpen(true);
  };

  const renderList = () => {
    switch (activeList) {
      case "all":
        return <AllMovies movies={movies} setMovies={setMovies} onEdit={handleEdit} refreshMovies={refreshMovies} />;
      case "watched":
        return <WatchedMovies movies={movies} setMovies={setMovies} onEdit={handleEdit} refreshMovies={refreshMovies} />;
      case "notWatched":
        return <NotWatchedMovies movies={movies} setMovies={setMovies} onEdit={handleEdit} refreshMovies={refreshMovies} />;
      case "rating":
        return <MoviesByRating movies={movies} setMovies={setMovies} onEdit={handleEdit} refreshMovies={refreshMovies} />;
      default:
        return <AllMovies movies={movies} setMovies={setMovies} onEdit={handleEdit} refreshMovies={refreshMovies} />;
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://uploads.metroimg.com/wp-content/uploads/2015/12/24190546/mosaico_filmes.jpg')] bg-cover bg-center p-3 sm:p-5 bg-fixed border-l-4 border-r-4 border-b-4 border-yellow-400/50">
      <header className="max-w-6xl mx-auto text-center mb-4 sm:mb-6">
        <h1 style={{
          fontFamily: 'Bungee',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }} className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
          🎬 Movie Watchlist App
        </h1>
      </header>

      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl shadow-xl border border-white/20">

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-full sm:w-auto flex flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-0">
            <button
              onClick={() => setActiveList("all")}
              style={{
                fontFamily: 'Bungee',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md font-semibold ${activeList === "all" ? 'bg-gray-900/90' : 'bg-gray-700/80'} text-yellow-400 hover:bg-gray-600 hover:scale-105 transition-all border ${activeList === "all" ? 'border-yellow-400/30' : 'border-white/10'} shadow-lg hover:shadow-white/20 backdrop-blur-sm`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveList("watched")}
              style={{
                fontFamily: 'Bungee',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md font-semibold ${activeList === "watched" ? 'bg-gray-900/90' : 'bg-gray-700/80'} text-yellow-400 hover:bg-gray-600 hover:scale-105 transition-all border ${activeList === "watched" ? 'border-yellow-400/30' : 'border-white/10'} shadow-lg hover:shadow-white/20 backdrop-blur-sm`}
            >
              Vistos
            </button>
            <button
              onClick={() => setActiveList("notWatched")}
              style={{
                fontFamily: 'Bungee',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md font-semibold ${activeList === "notWatched" ? 'bg-gray-900/90' : 'bg-gray-700/80'} text-yellow-400 hover:bg-gray-600 hover:scale-105 transition-all border ${activeList === "notWatched" ? 'border-yellow-400/30' : 'border-white/10'} shadow-lg hover:shadow-white/20 backdrop-blur-sm`}
            >
              Por ver
            </button>
            <button
              onClick={() => setActiveList("rating")}
              style={{
                fontFamily: 'Bungee',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md font-semibold ${activeList === "rating" ? 'bg-gray-900/90' : 'bg-gray-700/80'} text-yellow-400 hover:bg-gray-600 hover:scale-105 transition-all border ${activeList === "rating" ? 'border-yellow-400/30' : 'border-white/10'} shadow-lg hover:shadow-white/20 backdrop-blur-sm`}
            >
              Por Rating
            </button>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              fontFamily: 'Bungee',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base bg-green-500/90 hover:bg-green-500 text-yellow-400 rounded-md font-bold hover:scale-105 transition-all border border-green-400/30 shadow-lg hover:shadow-green-500/30 backdrop-blur-sm sm:ml-auto"
          >
            + Adicionar Filme
          </button>
        </div>

        <div className="grid gap-4 sm:gap-6">{renderList()}</div>

        {isAddModalOpen && (
          <AddMovie
            onClose={() => setIsAddModalOpen(false)}
            onMovieAdded={async () => {
              await refreshMovies();
              setIsAddModalOpen(false);
            }}
          />
        )}

        {isEditModalOpen && selectedMovie && (
          <EditMovie
            movie={selectedMovie}
            onClose={() => setIsEditModalOpen(false)}
            onMovieUpdated={async () => {
              await refreshMovies();
              setIsEditModalOpen(false);
            }}
          />
        )}
      </div>

      <footer className="fixed bottom-2 sm:bottom-4 left-0 w-full z-10 pointer-events-none">
        <div className="max-w-6xl mx-auto text-center text-xs sm:text-sm pointer-events-auto">
          <span style={{
            fontFamily: 'Bungee',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }} className="text-yellow-400">
            Movie Watchlist App - Todos os direitos reservados 2025
          </span>
        </div>
      </footer>
    </div>
  );
}
