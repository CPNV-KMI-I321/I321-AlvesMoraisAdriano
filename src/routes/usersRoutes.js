import { Router } from "express";
import { getUsers } from "../controllers/usersController.js";

// Création du routeur des utilisateurs.
const router = Router();

// GET /api/users
router.get("/", getUsers);

export default router;