<template>
  <section class="bg-primary-300">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <!-- Titre 404 -->
        <h1
          class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-700"
        >
          404
        </h1>

        <!-- Message d'erreur -->
        <p
          class="mb-4 text-3xl tracking-tight font-bold text-neutral-700 md:text-4xl"
        >
          Oops... The magic seems to have vanished!
        </p>

        <!-- Description -->
        <p class="mb-4 text-lg font-light text-neutral-600">
          Looks like the page you're looking for doesn't exist. But don’t worry,
          there are plenty of magical adventures awaiting you on the home page.
        </p>

        <!-- Bouton retour -->
        <RouterLink to="/">
          <button
            class="inline-flex text-white font-bold bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary-600 rounded-lg text-sm px-5 py-2.5 text-center my-4 cursor-pointer transform hover:scale-105 transition-all"
          >
            Back to the Magical World
          </button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup></script>
