//                 importation
const express = require("express");
const cors = require("cors"); // to connect with frontend
const path = require("path");
const passport = require("passport");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
//               Routes

const userRoutes = require("./apis/users/users.routes");
const eventRoutes = require("./apis/events/events.routes");
//                   DB
const connectDB = require("./db/database");
//                 Passport
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();
app.use(express.json());
//                 Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(logger);
app.use((req, res, next) => {
  if (req.body.name === "Broccoli Soup")
    res.status(400).json({ message: "I HATE BROCCOLI!! KEEFY! " });
  else next();
});

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/api", userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/events", eventRoutes);
//              handling error
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});
app.use(errorHandler);

connectDB(); //connect to the database
const PORT = 8080; //connection to a host
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
