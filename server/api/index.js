import { Router } from "express";

import items from "./items";
import upload from "./upload";

const router = Router();

// Add USERS Routes
router.use(items);
router.use(upload);

export default router;
