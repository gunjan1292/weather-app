const path = require("path");
const chalk = require("chalk");
const express = require("express");
const hbs = require("hbs");
const location = require("./Utility/location");
const Geo = require("./Utility/geo");

const app = express();

const port = process.env.PORT;

// Define Paths forexpress config
const publicDirectory = path.join(__dirname, "../public");
// console.log(publicDirectory);

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars and views locationn

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory));

//directory to serve

app.get("", function (req, res) {
  res.render("index", {
    title: "Waether App 2",
    name: "Gunjan Bhardwaj",
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    title: "about",

    name: "gunjan sharma",
  });
});

app.get("/help", function (req, res) {
  res.render("help", {
    title: "help",
    name: "Sharma Gunjan",
  });
});

// app.get("", function (req, res) {
//   res.send("<h2>Hello Express</h2>");
// });

// app.get("/about", function (req, res) {
//   res.send("<h2>Hello About</h2>");
// });

// app.get("/help", function (req, res) {
//   res.send("<h2>Hello Help</h2>");
// });
app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "Please enter a search value",
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

app.get("/weather", function (req, res) {
  const cityname = req.query.address;

  //if and else can be replace by if + return
  // if cityname === undefined ....................... if !cityname
  // toronto or "new delhi"

  if (!req.query.address) {
    res.send({
      error: "You must enter the Address",
    });
  } else {
    location(cityname, function (error, coordinates) {
      if (!cityname) {
        return console.log(chalk.redBright.inverse("Please enter a city name"));
      } else if (error) {
        return console.log(chalk.redBright.inverse("Error :", error)); //if error return error and stop
      }

      // console.log("coordinates :", coordinates);

      Geo(coordinates.lat, coordinates.lon, function (error, data) {
        if (error) {
          return console.log(chalk.redBright.inverse("Error :", error)); //if error return error and stop
        }

        res.send({
          forecast: data,
          longitude: coordinates.lon,
          latitude: coordinates.lat,
          place: cityname,
        });

        console.log(data);
        console.log(coordinates);
        // console.log("git testing")
      });
    });
  }
});

app.get("/help/*", function (req, res) {
  res.render("404", {
    title: "help",
    name: "Sharma Gunjan",
  });
});

app.get("*", function (req, res) {
  res.render("404");
});

app.listen(port, function () {
  console.log(`Server is up on Port 3000 ${port}`);
});
