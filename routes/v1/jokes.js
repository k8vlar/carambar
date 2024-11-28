const express = require("express");
const router = express.Router();
const jokeController = require("../../controllers/jokeController");

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Ajouter une nouvelle blague
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - reponse
 *             properties:
 *               question:
 *                 type: string
 *                 description: La question de la blague
 *               reponse:
 *                 type: string
 *                 description: La réponse de la blague
 *     responses:
 *       201:
 *         description: Blague ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la nouvelle blague
 *                 message:
 *                   type: string
 *                   example: Blague ajoutée avec succès
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: La question et la réponse sont requises
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erreur lors de l'ajout de la blague
 */
router.post("/", jokeController.addJoke);

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Consulter toutes les blagues
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Liste des blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   question:
 *                     type: string
 *                   reponse:
 *                     type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erreur lors de la récupération des blagues
 */
router.get("/", jokeController.getAllJokes);

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Consulter une blague aléatoire
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Une blague aléatoire
 */
router.get("/random", jokeController.getRandomJoke);

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Consulter une blague par ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la blague à consulter
 *     responses:
 *       200:
 *         description: Détails de la blague
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 question:
 *                   type: string
 *                 reponse:
 *                   type: string
 *       404:
 *         description: Blague non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Blague non trouvée
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erreur lors de la récupération de la blague
 */
router.get("/:id", jokeController.getJokeById);

/**
 * @swagger
 * /jokes/{id}:
 *   delete:
 *     summary: Supprimer une blague par ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la blague à supprimer
 *     responses:
 *       204:
 *         description: Blague supprimée avec succès
 *       404:
 *         description: Blague non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", jokeController.deleteJoke); // Ajouter la route de suppression

module.exports = router;