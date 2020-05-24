const express = require('express');
const path = require('path');
const hbs = require('hbs');
const utils = require('./utils');

const app = express();

// Define paths for express config
const publicFolderPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPaths);

// setup static directory to serve
app.use(express.static(publicFolderPath));

app.get("", (req, res) => {
  res.render('index', {
    'title': "Dynamic web page title"
  });
})

app.get("/about", (req, res) => {
  res.render('about', {
    'title': "About Page"
  });
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: "You must provide the address"
    })
  }

  utils.getLatLong(req.query.address)
  .then(response => {
    return utils.getTemprature(response.lat,response.long)
  })
  .then(result => {
    console.log(result);
    res.send({
      address: req.query.address,
      temperature: result.temperature
    })
  })
})

app.get("/products", (req, res) => {
  if(!req.query.search){
    return res.send({
      error: "You must provide the search term"
    })
  }

  console.log(req.query.search);
  res.send({
    products:[]
  })
})

app.get("*", (req, res) => {
 res.send("<h1>Page not found</h1>")
})



app.listen(3000, ()=>{
  console.log("Started listening on port : 3000");
})