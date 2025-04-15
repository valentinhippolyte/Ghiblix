<template>
  <div v-if="hasMovies" class="container mx-auto p-4">
    <!-- Header aligné avec la grille et responsive -->
    <div class="max-w-7xl mx-auto p-4 flex justify-end">
      <Filter v-if="movies.length !== 0" @update-filter="updateFilter" />
    </div>

    <!-- Liste des films, avec une grille responsive -->
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
    >
      <RouterLink
        v-for="movie in filteredMovies"
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

  <!-- Message si aucun film -->
  <div v-else class="container mx-auto p-4 text-center text-neutral-600">
    No movies available!
  </div>

  <LoadingList v-else />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Filter from "../Filter.vue";
import { useMovies } from "../../store/movies.js";
import LoadingList from "../LoadingList.vue";

const movies = ref([]); //Movies list
const store = useMovies();
const filterCriteria = ref("");

const fetchMovies = async () => {
  await store.fetchMovies();
  movies.value = store.movies;
};

const hasMovies = computed(() => movies.value.length > 0);

// function is called when the filter component emits an event
const updateFilter = (newFilter) => {
  filterCriteria.value = newFilter;
};

// filter movies depending on the filter criteria
const filteredMovies = computed(() => {
  if (!filterCriteria.value) return movies.value;

  return [...movies.value].sort((a, b) => {
    switch (filterCriteria.value) {
      case "year":
        return b.release_date - a.release_date;
      case "note":
        return a.rt_score.localeCompare(b.rt_score);
      default:
        return 0;
    }
  });
});

//load movies when the component is mounted
onMounted(fetchMovies);
</script>
