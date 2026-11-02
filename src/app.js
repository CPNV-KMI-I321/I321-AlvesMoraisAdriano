import express from "express";
import cors from "cors";
import "dotenv/config";

import usersRoutes from "./routes/usersRoutes.js";

// Initialisation de l'application Express.
const app = express();

// Configuration du port et des middlewares.
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*"
}));

// Route d'accueil.
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

// Route des utilisateurs.
app.use("/api/users", usersRoutes);

// Gestion des routes inexistantes.
app.use((req, res) => {
    res.status(404).json({
        message: "Resource not found"
    });
});

// Démarrage du serveur.
app.listen(PORT, () => {
    console.log(`API démarrée sur le port ${PORT}`);
});