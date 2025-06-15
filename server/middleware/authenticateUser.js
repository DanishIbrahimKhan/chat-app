const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader);

  // Handle cases with or without 'Bearer' prefix
  const token = authHeader && (authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader);

  console.log("Token Extracted:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "Danish123", (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: "Forbidden" });
    }

    console.log("Token decoded:", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };
