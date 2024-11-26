const express = require("express");
const router = express.Router();
const jokeController = require("../../controllers/jokeController");

/**
 * @swagger
 * /routes/v1/jokes:
 *   post:
 *     summary: Ajouter une nouvelle blague
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blague créée
 *       400:
 *         description: Erreur de requête
 */
router.post("/", jokeController.addJoke);

/**
 * @swagger
 * /routes/v1/jokes:
 *   get:
 *     summary: Obtenir toutes les blagues
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Liste de toutes les blagues
 */
router.get("/", jokeController.getAllJokes);

/**
 * @swagger
 * /routes/v1/jokes/{id}:
 *   get:
 *     summary: Obtenir une blague par son ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blague trouvée
 *       404:
 *         description: Blague non trouvée
 */
router.get("/:id", jokeController.getJokeById);

/**
 * @swagger
 * /routes/v1/jokes/random:
 *   get:
 *     summary: Obtenir une blague aléatoire
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Blague aléatoire
 *       404:
 *         description: Aucune blague trouvée
 */
router.get("/random", jokeController.getRandomJoke);

module.exports = router;
