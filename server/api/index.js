import { Router } from "express";

import items from "./items";
import upload from "./upload";
import tree from "./tree";

const router = Router();

router.use(items);
router.use(upload);
router.use(tree);

export default router;
