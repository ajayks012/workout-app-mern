const jwt = require("jsonwebtoken");
const userModal = require("../models/workoutUserModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  // console.log(req.headers);

  if (!authorization) {
    return res.status(401).json("Auth token required");
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = await userModal.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json("Request not autorized");
  }
};

module.exports = requireAuth;
