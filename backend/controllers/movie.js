import fetch from "node-fetch";
import User from "../models/user.js";

export const getAllMovies = async (req, res) => {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/films/");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error during movies recuperation:", error);
  }
};

export const getOneMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
    console.error("Error during movie recuperation:", error);
  }
};
export const getFavoritesMovies = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).populate("favorites");
    res.status(200).json(user?.favorites);
    return user?.favorites;
  } catch (error) {
    res.status(500);
    console.error("Erreur :", error);
  }
};

export const getSeenMovies = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).populate("seen");
    res.status(200).json(user?.seen);
    return user?.seen;
  } catch (error) {
    res.status(500);
    console.error("Error:", error);
  }
};

export const addToFavorites = async (req, res) => {
  const userId = req.params.userId;
  const movieId = req.params.movieId;
  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { favorites: movieId },
    });
    res.status(200).json({ message: "Movie added to favorite movies!" });
  } catch (error) {
    res.status(500);
    console.error("Error when adding movie to the favorite movies:", error);
  }
};
export const addToSeen = async (req, res) => {
  const userId = req.params.userId;
  const movieId = req.params.movieId;
  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { seen: movieId },
    });
    res.status(200).json({ message: "Movie added to seen movies!" });
  } catch (error) {
    res.status(500);
    console.error("Error when adding movie to the seen movies:", error);
  }
};

export const removeFromSeen = async (req, res) => {
  const userId = req.params.userId;
  const movieId = req.params.movieId;
  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { seen: movieId },
    });
    res.status(200).json({ message: "Movie remove from seen movies" });
  } catch (error) {
    res.status(500);
    console.error("Error when deleting movie from the seen movies:", error);
  }
};

export const removeFromFavorites = async (req, res) => {
  const userId = req.params.userId;
  const movieId = req.params.movieId;
  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: movieId },
    });
    res.status(200).json({ message: "Movie remove from favorite movies" });
  } catch (error) {
    res.status(500);
    console.error("Error when deleting movie from the favorite movies:", error);
  }
};
export default {
  getAllMovies,
  getOneMovie,
  getSeenMovies,
  getFavoritesMovies,
  addToSeen,
  addToFavorites,
  removeFromSeen,
  removeFromFavorites,
};
