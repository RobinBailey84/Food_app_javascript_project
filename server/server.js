const express = require('express');
const app = express();
const path = require('path')
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');


const publicPath = path.join(__dirname, '../client/public');

app.use(express.static(publicPath));
app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('foods');

  const recipeBookCollection = db.collection('recipeBook');
  const recipeBookRouter = createRouter(recipeBookCollection);
  app.use('/api/recipeBook', recipeBookRouter);

  const recipesCollection = db.collection('recipes');
  const recipesRouter = createRouter(recipesCollection);
  app.use('/api/recipes', recipesRouter);

}).catch(console.err);

app.listen(3000, function ()  {
  (`Listening on port ${this.address().port}`);
});
