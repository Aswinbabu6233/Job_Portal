const JWT = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Authorization denied" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      message: "invalid token",
    });
  }
};

const isEmployer = (req, res, next) => {
  if (req.user.role !== "employer") {
    return res
      .status(403)
      .json({ message: "Only employers can access this route" });
  }
  next();
};

const isUser = (req, res, next) => {
  if (req.user.role !== "job_seeker") {
    return res
      .status(403)
      .json({ message: "Only job seeker can perform this action" });
  }
  next();
};

module.exports = { authenticate, isEmployer, isUser };
