<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <button
      type="button"
      class="inline-flex gap-x-1.5 px-4 py-2 btn"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      @click="openDropdownMenu = !openDropdownMenu"
    >
      Sort
      <svg
        class="-mr-1 size-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        data-slot="icon"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
      v-show="openDropdownMenu"
      class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-50 ring-1 shadow-lg ring-primary-700/50 focus:outline-hidden"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <button
          v-for="(option, index) in filterOptions"
          @click="selectFilter(option.value)"
          :key="index"
          class="block px-4 py-2 text-sm text-neutral-800"
          :class="{
            'bg-primary-200 font-semibold': selectedFilter === option.value,
          }"
          role="menuitem"
          tabindex="-1"
          id="menu-item-0"
          :aria-selected="selectedFilter === option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["update-filter"]);
const openDropdownMenu = ref(false);
const selectedFilter = ref("");
const dropdownRef = ref(null); // Référence pour détecter les clics en dehors

const filterOptions = [
  { label: "Nothing", value: "" },
  { label: "By Recent Release Years", value: "year" },
  { label: "By Best Notes", value: "note" },
];

const selectFilter = (filter) => {
  selectedFilter.value = filter;
  emit("update-filter", filter);
  openDropdownMenu.value = false;
};

// Fonction pour détecter un clic en dehors du dropdown
const clickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    openDropdownMenu.value = false;
  }
};

// Ajouter/Supprimer l'event listener au montage/démontage du composant
onMounted(() => document.addEventListener("click", clickOutside));
onUnmounted(() => document.removeEventListener("click", clickOutside));
</script>
