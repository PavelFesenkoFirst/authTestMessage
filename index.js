const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./done/passport-setup");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// куки сессии
app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// инициализация паспорта и ПОКА ЧТО СЕССИИ
app.use(passport.initialize());
app.use(passport.session());

// роуты на удачное или неудачное подключение
app.get("/", (req, res) => res.send("Тест домашней страницы"));
app.get("/failed", (req, res) => res.send("Не получилось, не фортануло"));

// ОТОбражение того что пользователь аутентифицировался: req.user
app.get("/good", isLoggedIn, (req, res) =>
  res.send(`Здарова дядька ${req.user.displayName}!`)
);

// Роут аутентификации
app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // аутентифицировались и переходим на домашний URl
    res.redirect("/good");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
