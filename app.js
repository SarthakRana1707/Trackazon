const path = require("path");
const express = require("express");
const app = express();
const flash = require("connect-flash");
require("dotenv").config();
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const passport = require("./auth/passport");
const PORT = process.env.PORT;
const session = require("express-session");
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_PATH,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.redirect("/login");
});

const { isAdmin } = require("./middleware/admin.js");
const { isLoggedIn } = require("./middleware/isLoggedIn.js");
app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));
app.use(isLoggedIn);
app.use("/profile", require("./routes/profile"));
app.use("/admin", isAdmin, require("./routes/admin.js"));
app.use("/shop", require("./routes/shop"));

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
mongoose.connect(process.env.DB_PATH).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:` + PORT);
  });
});
