const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});


const Article = mongoose.model("Article", articleSchema);
module.exports.Article = Article;


module.exports.main = main;
async function main() {
  mongoose.set('strictQuery', true);

  const mongoURL = 'mongodb+srv://Admin:'+process.env.MONGODB_ATLAS_SECRET+'@'+process.env.MONGODB_ATLAS_URL+'/wikiDB'
  await mongoose.connect(mongoURL); // Cloud
  // await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB'); // Local

  console.log("MongoDB conected");
  initDatabase();
}


function initDatabase(){ 
    const article1 = new Article({
      title: "Article 1",
      content: "This is the content of the article 1"
    });
    const article2 = new Article({
      title: "Article 2",
      content: "This is the content of the article 2"
    });
   
    Article.find({},function(err, data){
      if(err){
        console.log("Error: "+err)
      }else{
        if(!data || data.length === 0){
          article1.save();
          article2.save();
          console.log("Database initied");
        }
      }
    });
}


module.exports.deleteArticle = deleteArticle;
function deleteArticle(articleId){
  console.log(articleId)

  Article.deleteOne({_id: articleId}, function(err) {
    if(err){
      console.log("Error: "+err);
    }else{
      console.log("Article deleted");
    }
  });
}


module.exports.createArticle = createArticle;
function createArticle(articleName, articleContent){
  return new Promise((resolve, reject) => {
  const article = new Article({
    title: articleName,
    content: articleContent
  })
  article.save(function(err) {
    if(err){
        reject(err);
      }else{
        resolve("Article created");
      }
  });
});
}

module.exports.getAllArticles = getAllArticles;
function getAllArticles(){
  return new Promise((resolve, reject) => {
    Article.find({}, function(err, articles) {
      if (err) reject(err);
      resolve(articles);
    });
  });
}

module.exports.getArticle = getArticle;
function getArticle(articleTitle){
  return new Promise((resolve, reject) => {
    Article.findOne({title: articleTitle},
      function(err, article) {
        console.log(article)
        if (err) reject(err);
        if(article){
          resolve(article);
        }else{
          resolve("No article found");
        }
    });
  });
}

module.exports.deleteAllArticles = deleteAllArticles;
function deleteAllArticles(){
  return new Promise((resolve, reject) => {
    Article.deleteMany({}, function(err) {
      if(err){
        reject(err);
      }else{
        resolve("All articles deleted");
      }
    });
  });
}

module.exports.putArticle = putArticle;
function putArticle(title, articleTitle, articleContent){
  return new Promise((resolve, reject) => {
    Article.replaceOne(
      {title: title},
      {title: articleTitle, content: articleContent},
      {overwrite: true},
      function(err) {
        if(err){
          reject(err);
        }else{
          resolve("Article updated");
        }
      }
    );
  });
}

module.exports.patchArticle = patchArticle;
function patchArticle(title, articleTitle, articleContent){
  return new Promise((resolve, reject) => {
    Article.updateOne(
      {title: title},
      {$set: {title: articleTitle, content: articleContent}},
      function(err) {
        if(err){
          reject(err);
        }else{
          resolve("Article updated");
        }
      }
    );
  });
}

module.exports.deleteArticle = deleteArticle;
function deleteArticle(title){
  return new Promise((resolve, reject) => {
    Article.deleteOne({title}, function(err) {
      if(err){
        reject(err);
      }else{
        resolve("Article deleted");
      }
    });
  });
}

// Mongo Operators
    // https://www.mongodb.com/docs/manual/reference/operator/update/
//Mongoose API DOc
    // https://mongoosejs.com/docs/api.html#model_Model.updateOne