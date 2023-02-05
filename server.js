require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const database = require(__dirname+'/database.js');
const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Init database
database.main().catch(err => console.log(err));


app.listen(port, function() {
  console.log("Server starter on http://localhost:"+port);
});


app.get('/', async (req, res) => {
  res.render('home', {});
});

app.route('/articles')

  .get(async (req, res) => {
    await database.getAllArticles().then((articles) => {
      res.send(articles);
    });
  })

  .post(async (req, res) => {
    articleName = req.body.title;
    articleContent = req.body.content;
    let result = await database.createArticle(articleName, articleContent);
    res.send(result);
  })

  .delete(async (req, res) => {
    articleName = req.body.title;
    articleContent = req.body.content;
    let result = await database.deleteAllArticles(articleName, articleContent);
    res.send(result);
  });


  app.route('/articles/:articleTitle')

  .get(async (req, res) => {
    articleTitle = req.params.articleTitle;
    await database.getArticle(articleTitle).then((article) => {
      res.send(article);
    });
  })

  .put(async (req, res) => {
    title = req.params.articleTitle;
    articleTitle = req.body.title;
    articleContent = req.body.content;
    let result = await database.putArticle(title, articleTitle, articleContent);
    res.send(result);
  })

  .patch(async (req, res) => {
    title = req.params.articleTitle;
    articleTitle = req.body.title;
    articleContent = req.body.content;
    let result = await database.patchArticle(title, articleTitle, articleContent);
    res.send(result);
  })

  .delete(async (req, res) => {
    articleTitle = req.params.articleTitle;
    let result = await database.deleteArticle(articleTitle);
    res.send(result);
  });
