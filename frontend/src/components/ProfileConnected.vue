<template>
  <div class="flex flex-col px-6 py-6 lg:px-8">
    <div class="flex justify-around items-center">
      <div class="flex gap-10">
        <div class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            :fill="showFavorites ? 'var(--color-neutral-200)' : 'neutral'"
            :stroke="
              showFavorites
                ? 'var(--color-neutral-200)'
                : 'var(--color-neutral)'
            "
            class="size-10"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fill-rule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clip-rule="evenodd"
            />
          </svg>

          <div class="absolute top-7 left-9 font-bold text-xl">
            <p :class="showFavorites ? 'text-neutral-200' : 'text-neutral'">
              {{ seenMovieIds.length }}
            </p>
          </div>
        </div>

        <div class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :fill="
              showFavorites
                ? 'var(--color-neutral)'
                : 'var(--color-neutral-200)'
            "
            viewBox="0 0 24 24"
            stroke-width="1.5"
            :stroke="
              showFavorites ? 'var(--color-neutral)' : 'var(--color-neutral-200'
            "
            class="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <div class="absolute top-7 left-9 font-bold text-xl">
            <p :class="showFavorites ? 'text-neutral' : 'text-neutral-200'">
              {{ favoriteMovieIds.length }}
            </p>
          </div>
        </div>
      </div>

      <div class="relative flex items-center justify-center">
        <img
          alt="Profile Picture"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cf7e701b-900b-4c90-b0b9-8ad7bbdd064e/d3dhkbx-7244374c-995b-46cc-ac0b-45df015758ba.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NmN2U3MDFiLTkwMGItNGM5MC1iMGI5LThhZDdiYmRkMDY0ZVwvZDNkaGtieC03MjQ0Mzc0Yy05OTViLTQ2Y2MtYWMwYi00NWRmMDE1NzU4YmEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wG-BuZwSOoM41ywYmrpf505Du7m_atF70gKrbED2lJs"
          class="size-28 rounded-full object-cover"
        />
        <p
          class="absolute top-22 text-xl font-semibold text-neutral-900 text-center bg-primary-200/60 px-4 py-1 rounded-2xl"
        >
          {{ authStore.user.username }}
        </p>
      </div>

      <button @click="logout" class="px-4 py-2 btn">Logout</button>
    </div>

    <div class="flex items-center justify-center my-6">
      <div class="border w-fit rounded-xl m-5 shadow-sm">
        <button
          class="px-4 py-2 rounded-l-xl font-medium transition-all duration-300 ease-in-out hover:bg-neutral hover:text-white"
          :class="{
            'bg-neutral text-white': showSeen,
            'bg-primary-50 text-neutral': !showSeen,
          }"
          @click="changeVue"
          :disabled="showSeen === true"
        >
          Seen
        </button>
        <button
          class="px-4 py-2 rounded-r-xl font-medium transition-all duration-300 ease-in-out hover:bg-neutral hover:text-white"
          :class="{
            'bg-neutral text-white': showFavorites,
            'bg-primary-50 text-neutral': !showFavorites,
          }"
          @click="changeVue"
          :disabled="showFavorites === true"
        >
          Favorites
        </button>
      </div>
    </div>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="movie in showFavorites ? favoriteMovies : seenMovies"
          :key="movie._id"
          :to="`/movies/${movie.id}`"
          class="max-w-sm bg-neutral-50 rounded-3xl shadow-xl shadow-neutral block h-full transition-transform transform hover:scale-105 active:scale-95 border border-neutral-200"
        >
          <!-- Image -->
          <img
            class="rounded-t-3xl w-full h-80 object-cover"
            :src="movie.image"
            :alt="movie.title"
          />

          <!-- Content -->
          <div class="p-5 grid">
            <!-- Title -->
            <h5 class="font-bold text-2xl text-neutral-900 line-clamp-2">
              {{ movie.title }}
            </h5>

            <!-- Date -->
            <span class="text-primary-600 pt-2 font-semibold">
              ({{ movie.release_date }})
            </span>

            <!-- Description -->
            <p class="text-neutral-600 text-sm/5.5 font-light line-clamp-3">
              {{ movie.description }}
            </p>
          </div>
        </RouterLink>
      </div>
    </div>

    <NoMovie v-if="favoriteMovies.length === 0 && showFavorites" />
    <NoMovie v-if="seenMovies.length === 0 && showSeen" />
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuth } from "../store/auth.js";
import { useMovies } from "../store/movies.js";
import NoMovie from "./NoMovie.vue";

const apiUrl = import.meta.env.VITE_API_URL;

const authStore = useAuth();
const moviesStore = useMovies();

const showFavorites = ref(false);
const showSeen = ref(true);
const favoriteMovieIds = ref([]);
const seenMovieIds = ref([]);
const movies = ref([]);

const fetchMovies = async () => {
  await moviesStore.fetchMovies();
  movies.value = moviesStore.movies;
  console.log("all Movies ", movies.value);
};

const changeVue = () => {
  showFavorites.value = !showFavorites.value;
  showSeen.value = !showSeen.value;
};

const logout = () => {
  authStore.logout();
};

const fetchFavoritesMovies = async () => {
  try {
    const reponse = await fetch(
      `${apiUrl}/api/movies/${authStore.user.id}/favorites`
    );
    const data = await reponse.json();
    favoriteMovieIds.value = data;
    console.log(favoriteMovieIds.value);
  } catch (error) {
    console.error("Error when fetching favorite movies:", error);
  }
};

const fetchSeenMovies = async () => {
  try {
    const reponse = await fetch(
      `${apiUrl}/api/movies/${authStore.user.id}/seen`
    );
    const data = await reponse.json();
    seenMovieIds.value = data;
    console.log(seenMovieIds.value);
  } catch (error) {
    console.error("Error when fetching seen movies:", error);
  }
};

const favoriteMovies = computed(() => {
  return movies.value.filter((movie) =>
    favoriteMovieIds.value.includes(movie.id)
  );
});

const seenMovies = computed(() => {
  return movies.value.filter((movie) => seenMovieIds.value.includes(movie.id));
});

onMounted(() => {
  fetchFavoritesMovies();
  fetchSeenMovies();
  fetchMovies();
});
</script>
