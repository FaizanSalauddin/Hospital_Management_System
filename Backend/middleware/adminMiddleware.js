import jwt from "jsonwebtoken";

const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "secretkey");

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not admin" });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default adminMiddleware;