import express from "express";
import {
  getAllMovies,
  getOneMovie,
  getSeenMovies,
  getFavoritesMovies,
  addToSeen,
  addToFavorites,
  removeFromSeen,
  removeFromFavorites,
} from "../controllers/movie.js";
import authMiddleware from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getOneMovie);

router.get("/:userId/seen", getSeenMovies);
router.get("/:userId/favorites", getFavoritesMovies);

router.post("/:userId/seen/:movieId", authMiddleware, addToSeen);
router.post("/:userId/favorites/:movieId", authMiddleware, addToFavorites);

router.delete("/:userId/seen/:movieId", authMiddleware, removeFromSeen);
router.delete(
  "/:userId/favorites/:movieId",
  authMiddleware,
  removeFromFavorites
);

router.post("/login");
router.post("/register");

export default router;
