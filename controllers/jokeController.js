const Jokes = require("../models/joke");
const sequelize = require("../database");

// Ajouter une blague

exports.addJoke = async (req, res) => {
  try {
    const joke = await Jokes.create(req.body);
    res.status(201).json(joke);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Consulter toutes les blagues
exports.getAllJokes = async (req, res) => {
  try {
    const jokes = await Jokes.findAll();
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Consulter une blague par ID
exports.getJokeById = async (req, res) => {
  try {
    const joke = await Jokes.findByPk(req.params.id);
    if (joke) {
      res.json(joke);
    } else {
      res.status(404).json({ message: "Blague non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Consulter une blague aléatoire
exports.getRandomJoke = async (req, res) => {
  try {
    console.log("Tentative de récupération d'une blague aléatoire");
    const joke = await Jokes.findOne({ order: sequelize.random() });
    console.log("Blague récupérée:", joke);
    if (joke) {
      res.json({ question: joke.question, reponse: joke.reponse });
    } else {
      console.log("Aucune blague trouvée dans la base de données");
      res.status(404).json({ message: "Aucune blague trouvée" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération d'une blague aléatoire:", error);
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une blague par ID
exports.deleteJoke = async (req, res) => {
  try {
    const result = await Jokes.destroy({
      where: { id: req.params.id }
    });
    
    if (result) {
      res.status(204).send(); // Envoi d'une réponse 204 No Content si la suppression est réussie
    } else {
      res.status(404).json({ message: "Blague non trouvée" }); // Si aucune blague n'est trouvée avec cet ID
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Gestion des erreurs serveur
  }
};
