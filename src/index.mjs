import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session"; // npm i express-session
import userRoute from "./router/router.mjs";
import cartRouter from "./router/routerCart.mjs"

const app = express();
app.use(express.json());
app.use(cookieParser("perro"));
app.use(
  session({
    secret: "the batman",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
); // needs to be call before the router so all the routes can benefit of its utility.
// needs to be something hard to avoid people to be able to access your signedCookies.
//saveUninitialized is property that saves the session in the store / we don't want that
app.use(userRoute);
app.use(cartRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PORT in ${PORT}`);
});

app.get("/", (request, response) => {
  console.log(request.session.id); // session.id is the id generate everytime we open a session.
  // however, it is bad because it is not fixed, with every request it will generate a new id and
  // we need to make sure to keep the same id
  request.session.visited = true; // this will ensure the id is fixed.  so we can track the user and that
  // all the routes have the same id
  response.cookie("salutation", "hola", { maxAge: 30000 });
  response.send({ msg: "Hi" });
});
