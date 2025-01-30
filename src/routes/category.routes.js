import { Router } from "express";
const router = Router();

import { categoryList } from "../controllers/categoryController.js";

router.get("/get-list", categoryList);

export default router;
