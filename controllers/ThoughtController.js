const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = class ThoughtController {
  static async showThoughts(req, res) {
    res.render("thoughts/home");
  }

  static async dashboard (req, res) {
    res.render('thoughts/dashboard')
  }

  static createThought (req, res) {
    res.render('thoughts/create')
  }
};
