const userModal = require("../models/workoutUserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (_id) => {
  return jwt.sign({ _id }, process.env.REFRESH_SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModal.login(email, password);
    const { _id, name } = user;

    // create a token
    const token = createToken(_id);
    const refreshToken = createRefreshToken(_id);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false, //should be true when deploying
      // sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ _id, name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const refreshUser = (req, res) => {
  const cookie = req.cookies;
  console.log("cookie", cookie?.jwt);
  if (!cookie?.jwt) return res.status(401).json({ message: "unauthorised" });
  const refreshToken = cookie.jwt;
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    const user = await userModal.findOne({ _id: decoded._id });
    if (!user) return res.status(401).json({ message: "unauthorised" });
    const { _id, name, email } = user;
    const token = createToken(_id);
    res.status(200).json({ _id, name, email, token });
  });
};

// signup a user
const signupUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const user = await userModal.signup(name, email, password, age);
    const { _id, userName } = user;

    // create a token
    const token = createToken(_id);

    const refreshToken = createRefreshToken(_id);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false, //should be true when deploying
      // sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ _id, name: userName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = (req, res) => {
  const cookie = req.cookies;
  console.log("cookie", cookie?.jwt);
  if (!cookie?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false, //should be true when deploying
    // sameSite: "none",
  });
  res.json({ message: "Logout Success" });
};

module.exports = { signupUser, refreshUser, loginUser, logoutUser };
