import { Router } from "express";
import path from "path";
import fs from "fs";
import { rootPath } from '../config';

const router = Router();
let target = rootPath;

function dirTree(filename) {
  const stats = fs.lstatSync(filename);
  const info = {
    origin: filename,
    path: filename.slice(filename.indexOf(target) + target.length),
    label: path.basename(filename)
  };

  if (stats.isDirectory()) {
    info.type = "folder";
    info.nodes = fs.readdirSync(filename).map(node => {
      return dirTree(filename + "/" + node);
    });
  } else {
    info.type = "file";
  }

  return info;
}

router.get("/tree", function(req, res, next) {
  res.json(dirTree(process.cwd() + "/" + target));
});

export default router;
