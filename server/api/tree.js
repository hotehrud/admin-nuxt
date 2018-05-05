import { Router } from "express";
import path from "path";
import fs from "fs";

const router = Router();

function dirTree(filename) {
  var stats = fs.lstatSync(filename),
    info = {
      path: filename,
      label: path.basename(filename)
    };

  if (stats.isDirectory()) {
    info.type = "folder";
    info.nodes = fs.readdirSync(filename).map((node) => {
      return dirTree(filename + "/" + node);
    });
  } else {
    info.type = "file";
  }

  return info;
}

router.get("/tree", function(req, res, next) {
  res.json(dirTree(process.cwd() + "/assets"));
});

export default router;
