const jwt = require("jsonwebtoken");
const ErrorHander = require("../utils/errorhander");
const catchAsynceErroes = require("./catchAsyncErrors");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsynceErroes(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});
 