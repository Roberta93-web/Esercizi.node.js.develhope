import express from "express";
import "express-async-errors";
import morgan from "morgan";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage,
} from "./controllers/planets.js";
import multer from "multer";

const app = express();
const port = 4000;
app.use(morgan("dev"));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//GET
app.get("/api/planets", getAll);

//GETByID
app.get("/api/planets/:id", getOneById);

//POST
app.post("/api/planets", create);

//PUT
app.put("/api/planets/:id", updateById);

//DELETEID
app.delete("/api/planets/:id", deleteById);

//CREATEIMAGE
app.post("/api/planets/:id/image", upload.single("image"), createImage);

app.listen(port, () =>
  console.log(`Server listening on port: http://localhost:${port}`)
);
