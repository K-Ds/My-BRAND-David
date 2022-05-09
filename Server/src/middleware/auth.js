import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_API_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send({ error: "Invalid token" });
  }
}

export default auth;
