import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied, no token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken; // Ajoute l'ID de l'utilisateur dans la requête

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token", error: error });
  }
};

export default authMiddleware;
