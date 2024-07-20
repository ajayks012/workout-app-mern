const jwt = require("jsonwebtoken");
const userModal = require("../models/workoutUserModel");

const requireAuth = async (req, res, next) => {
  const { authorzation } = req.headers;

  if (!authorzation) {
    return res.status(401).json("Auth token required");
  }

  const token = authorzation.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.secret);
    req.user = await userModal.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json("Request not autorized");
  }
};

module.exports = requireAuth;
