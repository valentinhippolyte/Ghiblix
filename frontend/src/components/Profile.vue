<template>
  <div
    v-if="!store.isAuthenticated"
    class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="../assets/login.png" alt="Totoro" class="mx-auto h-50 w-auto" />
      <div class="flex items-center justify-center">
        <div class="border w-fit rounded-xl m-5 shadow-sm">
          <!-- Login Button -->
          <button
            class="px-4 py-2 rounded-l-xl font-medium transition-all duration-300 ease-in-out hover:bg-neutral hover:text-white"
            :class="{
              'bg-neutral text-white': isLogin,
              'bg-primary-50 text-neutral': !isLogin,
            }"
            @click="isLogin = !isLogin"
            :disabled="isLogin === true"
          >
            Login
          </button>

          <!-- Register Button -->
          <button
            class="px-4 py-2 rounded-r-xl font-medium transition-all duration-300 ease-in-out hover:bg-neutral hover:text-white"
            :class="{
              'bg-neutral text-white': !isLogin,
              'bg-primary-50 text-neutral': isLogin,
            }"
            @click="isLogin = !isLogin"
            :disabled="isLogin === false"
          >
            Register
          </button>
        </div>
      </div>

      <ErrorMessage :message="store.errorMessage" v-if="store.errorMessage" />
    </div>

    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        action="/profile"
        method="POST"
        @submit.prevent="sendAuth"
      >
        <div>
          <label
            for="username"
            class="block text-sm/6 font-medium text-neutral"
          >
            Username
          </label>
          <div class="mt-2">
            <input
              v-model="username"
              type="text"
              name="username"
              id="username"
              autocomplete="username"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral outline-1 -outline-offset-1 outline-primary-300 placeholder:text-primary-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-neutral"
            >
              Password
            </label>
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral outline-1 -outline-offset-1 outline-primary-300 placeholder:text-primary-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
            />
          </div>
        </div>

        <!-- Confirmation Password -->
        <div v-if="!isLogin">
          <div class="flex items-center justify-between">
            <label
              for="confirmPassword"
              class="block text-sm/6 font-medium text-neutral"
            >
              Confirm Password
            </label>
          </div>
          <div class="mt-2">
            <input
              v-model="confirmPassword"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autocomplete="current-password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral outline-1 -outline-offset-1 outline-primary-300 placeholder:text-primary-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="!isLogin && password !== confirmPassword"
            class="flex w-full justify-center px-3 py-1.5 rounded-md font-medium transition-all duration-300 ease-in-out bg-secondary text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-700"
          >
            {{ isLogin ? "Sign in" : "Sign up" }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <ProfileConnected v-else />
</template>
<script setup>
import { onUnmounted, ref, watch } from "vue";
import { useAuth } from "../store/auth.js";
import ErrorMessage from "./ErrorMessage.vue";
import ProfileConnected from "./ProfileConnected.vue";

const store = useAuth();
const isLogin = ref(false);
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

watch(isLogin, () => {
  store.errorMessage = "";
});

watch(confirmPassword, (newVal) => {
  if (newVal !== password.value && !isLogin.value) {
    store.errorMessage =
      "Oops! Your passwords don’t match. Double-check and try again to keep the magic going! ✨";
  } else {
    store.errorMessage = "";
  }
});

const sendAuth = () => {
  store.authenticate(username.value, password.value, isLogin.value);
  username.value = "";
  password.value = "";
  confirmPassword.value = "";
};

onUnmounted(() => {
  store.errorMessage = "";
});
</script>
