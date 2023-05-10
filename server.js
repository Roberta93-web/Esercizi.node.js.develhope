import express from "express";
import "express-async-errors";
import morgan from "morgan";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets.js";
import authorize from "./authorize.js";
import { signUp, logIn, logOut } from "./controllers/users.js";
import "./passport.js";

const app = express();
const port = 4000;
app.use(morgan("dev"));
app.use(express.json());

//GET
app.get("/api/planets", getAll);

//GETByID
app.get("/api/planets/:id", getOneById);

//POST
app.post("/api/planets", create);

//PUT
app.put("/api/planets/:id", updateById);

//DELETE
app.delete("/api/planets/:id", deleteById);

app.post("/api/users/signup", signUp);
app.post("/api/users/login", logIn);
app.get("/api/users/logout", authorize, logOut);

app.listen(port, () =>
  console.log(`Server listening on port: http://localhost:${port}`)
);
