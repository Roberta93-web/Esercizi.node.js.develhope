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

app.listen(port, () =>
  console.log(`Server listening on port: http://localhost:${port}`)
);
