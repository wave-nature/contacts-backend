const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { sendTokenAsResponse } = require("../utils/helper");
const promisify = require("util").promisify;
const jwt = require("jsonwebtoken");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, phone, password } = req.body;

  const user = await User.create({ name, phone, password });

  sendTokenAsResponse(res, user, 200);
});

exports.login = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect phone number or password", 401));
  }

  sendTokenAsResponse(res, user, 200);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get the jwt token and check if its exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token)
    return next(new AppError("You are not authorized! Please login", 401));

  // 2) Verfication of jwt
  const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(payload);

  // 3) check If user exist

  const user = await User.findById(payload.id);
  if (!user)
    return next(new AppError("The user trying to login doesnot exist", 401));

  // 4) check if user change password after token was issued, all the tokens before password updated should not be excepted
  // if (user.changedPasswordAfter(payload.iat)) {
  //   return next(
  //     new AppError("User recently changed password. Please login again", 401)
  //   );
  // }

  req.user = user;
  next();
});
