const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew Blyth",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Andrew Blyth",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some help text",
    name: "Andrew Blyth",
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Please provide a location'
    })
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if(req.query.address){
      if (err) {
        return res.send({
          error: err
        })
      }
      forecast(latitude, longitude, (err, forecastData) => {
        if(err){
          return res.send({
            error: err
          })
        }
        res.send({
          location,
          forecastData
        })
      })
    } else {
      res.send({
        error: 'Please provide a location'
      })
    }
  })
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        error: 'Help page not found'
    })

});

app.get("*", (req, res) => {
    res.render('404', {
        error: '404 page not found'
    })});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
