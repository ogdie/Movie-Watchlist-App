export const API_URL = "http://localhost:3000/api/movies";

// -----------------------------
// GET - Obter todos os filmes
// -----------------------------
export async function getAllMovies() {
  try {
    const res = await fetch(API_URL); // Requisição GET para obter todos os filmes
    if (!res.ok) throw new Error("Erro ao buscar filmes");
    return await res.json();
  } catch (error) {
    console.error("❌ getAllMovies:", error);
    return [];
  }
}

// -----------------------------
// GET - Filmes já vistos
// -----------------------------
export async function getWatchedMovies() {
  try {
    const res = await fetch(`${API_URL}?watched=true`);
    if (!res.ok) throw new Error("Erro ao buscar filmes vistos");
    return await res.json();
  } catch (error) {
    console.error("❌ getWatchedMovies:", error);
    return [];
  }
}

// -----------------------------
// GET - Filmes não vistos
// -----------------------------
export async function getNotWatchedMovies() {
  try {
    const res = await fetch(`${API_URL}?watched=false`);
    if (!res.ok) throw new Error("Erro ao buscar filmes não vistos");
    return await res.json();
  } catch (error) {
    console.error("❌ getNotWatchedMovies:", error);
    return [];
  }
}

// -----------------------------
// GET - Filmes ordenados por rating (desc)
// -----------------------------
export async function getMoviesByRating() {
  try {
    const res = await fetch(`${API_URL}?sortBy=rating&order=desc`);
    if (!res.ok) throw new Error("Erro ao ordenar filmes por rating");
    return await res.json();
  } catch (error) {
    console.error("❌ getMoviesByRating:", error);
    return [];
  }
}

// -----------------------------
// POST - Adicionar novo filme
// -----------------------------
export async function addMovie(movieData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
    });
    if (!res.ok) throw new Error("Erro ao adicionar filme");
    return await res.json();
  } catch (error) {
    console.error("❌ addMovie:", error);
    throw error;
  }
}

// -----------------------------
// PUT - Editar filme existente
// -----------------------------
export async function editMovie(id, movieData) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
    });
    if (!res.ok) throw new Error("Erro ao editar filme");
    return await res.json();
  } catch (error) {
    console.error("❌ editMovie:", error);
    throw error;
  }
}

// -----------------------------
// DELETE - Remover filme
// -----------------------------
export async function deleteMovie(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erro ao eliminar filme");
    return await res.json();
  } catch (error) {
    console.error("❌ deleteMovie:", error);
    throw error;
  }
}
