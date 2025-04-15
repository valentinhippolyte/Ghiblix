import Movie from "./components/Movie.vue";
import MovieList from "./components/screens/MovieListScreen.vue";
import Profile from "./components/Profile.vue";
import HomeScreen from "./components/screens/HomeScreen.vue";
import NotFound from "./components/screens/NotFound.vue";

export const routes = [
  { path: "/", component: HomeScreen },
  { path: "/movies", component: MovieList },
  { path: "/movies/:id", component: Movie },
  { path: "/profile", component: Profile },

  { path: "/:pathMatch(.*)*", component: NotFound },
];
