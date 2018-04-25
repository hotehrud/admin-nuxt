import { Router } from "express";
import path from "path";
import fs from "fs";

const router = Router();

/* GET users listing. */
router.get("/items", function(req, res, next) {
  // JSON.parse => sync
  const obj = JSON.parse(fs.readFileSync(process.cwd() + "/assets/items.json"));
  res.json(obj.items);
});

/* GET user by ID. */
router.get("/items/:id", function(req, res, next) {
  const id = parseInt(req.params.id);
  const obj = JSON.parse(fs.readFileSync(process.cwd() + "/assets/items.json"));

  if (id >= 0 && id < obj.items.length) {
    res.json(obj.items[id]);
  } else {
    res.sendStatus(404);
  }
});

export default router;
