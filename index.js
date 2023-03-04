const express = require("express");
const { config } = require("dotenv");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./utils/helper");
const AppError = require("./utils/appError");

config(".env");

const app = express();

connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/health", (req, res) =>
  res.json({ message: "Server is up 🚀 and running." })
);

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const PORT = process.env.PORT || 7400;
app.listen(PORT, () => console.log(`Server is running on port ${PORT} ✅`));
