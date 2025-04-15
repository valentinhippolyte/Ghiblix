import { defineStore } from "pinia";
import { ref } from "vue";

const apiUrl = import.meta.env.VITE_API_URL;
export const useMovies = defineStore(
  "movies",
  () => {
    const movies = ref([]);
    const fetchMovies = async () => {
      try {
        const reponse = await fetch(`${apiUrl}/api/movies/`);
        if (!reponse.ok) throw new Error("Failed when fetching movies");
        const data = await reponse.json();
        movies.value = data;
      } catch (error) {
        console.error("Error when fetching movies:", error);
      }
    };
    return { movies, fetchMovies };
  },
  { persist: true }
);
