<template>
  <div
    class="items-center w-10/12 grid-cols-1 md:grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5"
    data-aos="fade-right"
    data-aos-duration="800"
  >
    <!-- Texte et Appel à l'Action -->
    <div class="pr-2 md:mb-14 py-14 md:py-0">
      <h1
        class="text-3xl font-semibold text-primary-800 xl:text-5xl lg:text-3xl"
      >
        <span class="block w-full">Welcome to the Ghiblix Adventure!</span>
      </h1>
      <p class="py-4 text-lg text-neutral-700 2xl:py-8 md:py-6 2xl:pr-5">
        Browse our collection of Ghibli masterpieces, from heartwarming
        adventures to whimsical tales. Keep track of films you have seen, save
        your favorites, and rediscover the magic of animation, one film at a
        time!
      </p>
      <div class="mt-4">
        <RouterLink to="/movies">
          <button href="#explore" class="px-5 py-3 btn">
            <span>Embark on the adventure!</span>
          </button>
        </RouterLink>
      </div>
    </div>

    <!-- Image héro -->
    <div class="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0">
      <img
        id="heroImg1"
        class="transition-all duration-300 ease-in-out hover:scale-102 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 hidden md lg:block lg:pb-0"
        src="../../assets/heroImage.png"
        alt="Image magique de Ghibli"
        width="500"
        height="488"
      />
    </div>
  </div>
</template>
