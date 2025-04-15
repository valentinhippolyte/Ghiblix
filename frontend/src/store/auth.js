// @ts-nocheck
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const apiUrl = import.meta.env.VITE_API_URL;

export const useAuth = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const token = ref(null);
    const errorMessage = ref(null);
    const isAuthenticated = computed(() => user.value !== null);

    const logout = () => {
      user.value = null;
      token.value = null;
      errorMessage.value = null;
    };

    const authenticate = async (username, password, isLogin) => {
      if (
        password.length < 6 ||
        password.length > 20 ||
        username.length < 4 ||
        username.length > 20
      ) {
        console.log(`password: ${password.length} username ${username.length}`);
        errorMessage.value =
          "Oops! Your username or password needs to be between 6 and 20 characters. Let's try again! ✨";
        return false;
      }
      const url = isLogin
        ? `${apiUrl}/api/auth/login`
        : `${apiUrl}/api/auth/register`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.code === 11000) {
            errorMessage.value =
              "Whoops! This username is already taken. How about trying a different one, or you can always login if you're already a part of the magic! ✨";
            return false;
          } else if (errorData.message === "username or password not valid") {
            errorMessage.value =
              "Uh-oh! Looks like something went wrong with your username or password. Try again and let the magic flow! ✨";
            return false;
          } else {
            ("Oops! Something went awry. Let's try that again, shall we? 🌟");
            return false;
          }
        }

        const data = await response.json();
        user.value = { id: data.userId, username: data.username };
        token.value = data.token;
        console.log("User connected!", user.value);
        return true;
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
        return false;
      }
    };
    return { user, token, isAuthenticated, authenticate, logout, errorMessage };
  },
  { persist: true }
);
