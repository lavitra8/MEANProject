const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (typeof req.headers.authorization !== "string") {
    res.sendStatus(400);
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "You are not authenticated!",
    });
  }
};
