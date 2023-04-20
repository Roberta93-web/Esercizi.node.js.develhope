import express from "express";
import "express-async-errors";
import morgan from "morgan";
import Joi from "joi";

const app = express();
const port = 4000;
app.use(morgan("dev"));
app.use(express.json());

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  { id: 2, name: "Mars" },
  {
    id: 3,
    name: "Jupiter",
  },
];

//GET
app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

//GETByID
app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  res.status(200).json(planet);
});

//VALIDATION
const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

//POST
app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  const validateNewPlanet = planetSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    return res
      .status(400)
      .json({ msg: validateNewPlanet.error.details[0].message });
  } else {
    planets = [...planets, newPlanet]

  res.status(201).json({ msg: "New Planet was created" });
});

//PUT
app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "New Planet was updated" });
});

//DELETE
app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "New Planet was deleted" });
});

app.listen(port, () =>
  console.log(`Server listening on port: http://localhost:${port}`)
);
