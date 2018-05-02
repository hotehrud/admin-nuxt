import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();
let filepath = process.cwd() + "/assets/items.json";
let staticpath = "http://localhost:3000/images/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

router.post("/upload", upload.single("imageURL"), (req, res, next) => {
  const body = req.body;
  const id = parseInt(body.index);
  const obj = JSON.parse(fs.readFileSync(filepath));
  let update = {
    imageURL: staticpath + req.file.filename
  };

  Object.keys(body).forEach((key) => {
    update[key] = body[key];
  })

  if (id >= 0 && id < obj.items.length) {
    const target = obj.items[id];
    Object.keys(target).forEach(key => {
      if (update.hasOwnProperty(key)) {
        target[key] = update[key];
      }
    });
  }

  fs.writeFile(filepath, JSON.stringify(obj), "utf8", () => {
    res.sendStatus(201);
  });
});

export default router;
