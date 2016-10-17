'use strict';

/**
 * Module dependencies.
 */

const config = require('./../../config/config.json');
const mongoose = require('mongoose');

// End of dependencies.

mongoose.connect(config.mongo.connect);
mongoose.Promise = require('bluebird');
require('./../../models/Projects');
const Project = mongoose.model('Project');

new Project({
  url: 'http://www.google.fr',
  title: 'Google',
  description: "Version française du moteur de recherche. Propose des outils et des services pour les internautes.",
  crawling: 'no_crawling',
  verified: false,
  verificationToken: 'jkdhfjdshfkdlsfhlksdqfh',
  iconUrl: 'http://www.google.fr/favicon.ico',
  created: new Date(),
  modified: new Date()
}).save(err => {
  if (err) console.log(err);
});

new Project({
  url: 'http://www.lemonde.fr',
  title: 'Le Monde',
  description: "Le Monde.fr - 1er site d'information. Les articles du journal et toute l'actualité en continu : International, France, Société, Economie, Culture, Environnement, ...",
  crawling: 'no_crawling',
  verified: false,
  verificationToken: 'jkdhfjdshfkdlsfhlksdqfh',
  iconUrl: 'http://www.lemonde.fr/favicon.ico',
  created: new Date(),
  modified: new Date()
}).save(err => {
  if (err) console.log(err);
});

mongoose.connection.close();
