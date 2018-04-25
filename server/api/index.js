import { Router } from "express";

import items from "./items";

const router = Router();

// Add USERS Routes
router.use(items);

export default router;
