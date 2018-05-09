import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { rootPath, staticPath } from "../config";

const router = Router();

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

let filepath = process.cwd() + "/" + rootPath + "/";

router.post("/upload", upload.single("imageURL"), (req, res, next) => {
  const body = req.body;

  if (body.type === "json") {
    let type = body.type;
    let filename = body.filename;
    let fullpath = filepath + filename;
    const id = parseInt(body.index);
    const obj = JSON.parse(fs.readFileSync(fullpath));

    let update = {
      imageURL: staticPath + req.file.filename
    };

    Object.keys(body).forEach(key => {
      update[key] = body[key];
    });

    if (id >= 0 && id < obj.items.length) {
      const target = obj.items[id];
      Object.keys(target).forEach(key => {
        if (update.hasOwnProperty(key)) {
          target[key] = update[key];
        }
      });
    }

    fs.writeFile(fullpath, JSON.stringify(obj), "utf8", () => {
      res.sendStatus(201);
    });
  } else {
    // image file
    let originFile = body.before;
    let before = filepath + "images/" + originFile;
    let after = filepath + "images/" + req.file.filename;
    fs.rename(after, before, () => {
      res.sendStatus(201);
    });
  }
});

export default router;
