/*   SERVER SIDE JAVASCRIPT    */

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { getHeapSnapshot } = require("v8");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, "../public");
// customizing name of directory where views live. From views to templates
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set("view engine", "hbs"); // Tell express what engine we use
app.set("views", viewsPath); // setting the path to templates directory
hbs.registerPartials(partialsPath);

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath));

// Dynamic
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Alex Arobelidze",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Alex Arobelidze",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Help Page",
    title: "Help",
    name: "Alex Arobelidze",
  });
});

// Weather page - API same as DATA
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

// 404 page through /help page pattern
app.get("/help/*", (req, res) => {
  res.render("pageNotFound", {
    title: "404",
    name: "Alex Arobelidze",
    errorMessage: "Help article not found",
  });
});

// 404 page
app.get("*", (req, res) => {
  res.render("pageNotFound", {
    title: "404",
    name: "Alex Arobelidze",
    errorMessage: "Page not found",
  });
});

// Start server
app.listen(8000, () => {
  console.log("Server is up on port 8000...");
});
