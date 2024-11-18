const Joke = require("../models/joke");

// Ajouter une blague
exports.addJoke = async (req, res) => {
  try {
    const joke = await Joke.create(req.body);
    res.status(201).json(joke);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Consulter toutes les blagues
exports.getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Consulter une blague par ID
exports.getJokeById = async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);
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
    const joke = await Joke.findOne({ order: sequelize.random() });
    if (joke) {
      res.json(joke);
    } else {
      res.status(404).json({ message: "Aucune blague trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
