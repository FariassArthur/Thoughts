const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
require("dotenv").config();

const app = express();

const conn = require("./db/conn");

//Models
const Thought = require('./models/Thought')
const User = require('./models/User')

//Routes
const thoughtsRoutes = require('./routes/thoughtsRoutes');
const authRoutes = require('./routes/authRoutes')

//controller
const ThoughtController = require("./controllers/ThoughtController");
const AuthController = require('./controllers/AuthController')

//template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//res body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//session
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

//flash messages
app.use(flash());

//public path
app.use(express.static("public"));

//set session to response
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

//Routes
app.use('/thoughts', thoughtsRoutes)
app.use('/', authRoutes)

app.get('/', ThoughtController.showThoughts)

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
