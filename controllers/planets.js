let planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
  { id: 3, name: "Jupiter" },
];

const getAll = (req, res) => {
  res.status(200).json(planets);
};

const getOneById = (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  res.status(200).json(planet);
};

const create = (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };

  res.status(201).json({ msg: "New Planet was created" });
};

const updateById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "New Planet was updated" });
};

const deleteById = (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "New Planet was deleted" });
};

export { getAll, getOneById, create, updateById, deleteById };
