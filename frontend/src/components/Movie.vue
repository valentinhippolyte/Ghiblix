<template>
  <div v-if="movie" class="container mx-auto p-4">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Image du film -->
      <div
        class="rounded-lg shadow-lg w-full md:w-1/3 flex justify-center bg-primary-50"
      >
        <img
          :src="movie.image"
          :alt="movie.title"
          class="max-w-full h-auto rounded-lg shadow-md border-2 border-primary-300"
        />
      </div>

      <!-- Informations sur le film -->
      <div class="flex flex-col p-4 w-full md:w-2/3">
        <h2
          class="font-bold text-3xl sm:text-4xl text-primary-700 text-center md:text-left"
        >
          {{ movie.title }}
        </h2>
        <p
          class="text-center md:text-left text-primary-600 font-medium text-lg"
        >
          Directed by {{ movie.director }}
        </p>

        <!-- Icônes & Informations -->
        <div class="flex flex-wrap justify-center md:justify-start gap-6 p-4">
          <!-- Note -->
          <div class="flex flex-row items-center gap-2">
            <svg
              class="w-6 h-6 text-accent"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentcolor"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <p class="text-xl text-neutral font-medium">
              {{ movie.rt_score }}/100
            </p>
          </div>

          <!-- Durée -->
          <div class="flex flex-row items-center gap-2">
            <svg
              class="w-6 h-6 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p class="text-xl text-neutral font-medium">
              {{ movie.running_time }}m
            </p>
          </div>

          <!-- Date de sortie -->
          <div class="flex flex-row items-center gap-2">
            <svg
              class="w-6 h-6 text-secondary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <p class="text-xl text-neutral font-medium">
              {{ movie.release_date }}
            </p>
          </div>
        </div>

        <!-- Description -->
        <p class="text-neutral text-lg text-center md:text-left">
          {{ movie.description }}
        </p>

        <!-- Action Buttons -->
        <div
          v-if="store.isAuthenticated"
          class="flex flex-row gap-6 justify-center md:justify-start mt-6"
        >
          <!-- Button Add Seen -->
          <button class="px-6 py-3 btn" @click="addSeen" v-if="!isMovieSeen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>

            Add to Seen
          </button>

          <!-- Button Remove Seen -->
          <button class="px-6 py-3 btn" @click="removeSeen" v-if="isMovieSeen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path
                fill-rule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                clip-rule="evenodd"
              />
            </svg>

            Remove from Seen
          </button>

          <!-- Button Add Favorite -->
          <button
            class="px-6 py-3 btn"
            v-if="!isMovieFavorite"
            @click="addFavorite"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>

            Add to Favorites
          </button>

          <!-- Button Remove Favorite -->
          <button
            class="px-6 py-3 btn"
            v-if="isMovieFavorite"
            @click="removeFavorite"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
              />
            </svg>

            Remove from Favorites
          </button>
        </div>
        <div
          v-else
          class="inline-flex justify-center items-center p-4 text-sm text-neutral rounded-lg bg-primary-50 shadow-lg mt-10 w-auto"
          role="alert"
        >
          <div>
            <svg
              class="shrink-0 inline w-5 h-5 me-3 text-neutral"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
              />
            </svg>
          </div>
          <div class="font-medium text-neutral">
            <p class="text-xl text-neutral-800 font-semibold text-center">
              Please log in or create an account to add movies to your Seen or
              Favorites list.
            </p>
            <p class="text-sm text-neutral-600 text-center">
              Click
              <router-link to="/profile" class="text-primary-600"
                >here</router-link
              >
              to log in or to create a new account.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "../store/auth.js";

const route = useRoute();
const movie = ref(null);
const store = useAuth();
const isMovieFavorite = ref(false);
const isMovieSeen = ref(false);

const apiUrl = import.meta.env.VITE_API_URL;

const fetchMovie = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/movies/${route.params.id}`);
    if (!response.ok) throw new Error("Échec du chargement du film");
    movie.value = await response.json();
  } catch (error) {
    console.error("Error when fetching the movie:", error);
  }
};

const checkIfFavorite = async () => {
  try {
    const response = await fetch(
      `${apiUrl}/api/movies/${store.user.id}/favorites`
    );
    if (!response.ok) throw new Error("Échec de la vérification des favoris");
    const favorites = await response.json();
    isMovieFavorite.value = favorites.includes(route.params.id);
    console.log("isMovieFav", isMovieFavorite.value);
  } catch (error) {
    console.error("Error when checking favorite movies:", error);
  }
};

const checkIfSeen = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/movies/${store.user.id}/seen`);
    if (!response.ok) throw new Error("Failed to verify seen movies");
    const seen = await response.json();
    isMovieSeen.value = seen.includes(route.params.id);
    console.log("isMovieSeen ", isMovieSeen.value);
  } catch (error) {
    console.error("Error when checking seen movies:", error);
  }
};

const addFavorite = async () => {
  try {
    const response = await fetch(
      `${apiUrl}/api/movies/${store.user.id}/favorites/${route.params.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to add the movie to favorites");
    isMovieFavorite.value = true;
  } catch (error) {
    console.error("Error when adding the movie to favorites:", error);
  }
};

const addSeen = async () => {
  try {
    const response = await fetch(
      `${apiUrl}/api/movies/${store.user.id}/seen/${route.params.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to add the movie to seen movies");
    isMovieSeen.value = true;
  } catch (error) {
    console.error("Error when adding the movie to seen movies:", error);
  }
};

const removeSeen = async () => {
  try {
    const response = await fetch(
      `${apiUrl}/api/movies/${store.user.id}/seen/${route.params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );
    if (!response.ok)
      throw new Error("Failed to delete the movie to seen movies");
    isMovieSeen.value = false;
  } catch (error) {
    console.error("Error when deleting the movie to seen movies:", error);
  }
};

const removeFavorite = async () => {
  try {
    const response = await fetch(
      `${apiUrl}/api/movies/${store.user.id}/favorites/${route.params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );
    if (!response.ok)
      throw new Error("Failed to delete the movie to favorite movies");
    isMovieFavorite.value = false;
  } catch (error) {
    console.error("Error when deleting the movie to favorite movies:", error);
  }
};

onMounted(() => {
  fetchMovie();
  checkIfFavorite();
  checkIfSeen();
});
</script>
