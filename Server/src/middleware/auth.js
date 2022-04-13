import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.header("X-Auth-Token");

  if (!token) {
    return res.status(401).json({ error: "Access denied, No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send({ error: "Invalid token" });
  }
}

export default auth;
