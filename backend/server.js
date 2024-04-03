const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const mainController = require("./src/controllers/mainController");

app.use(bodyParser.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/", mainController);



app.use((req, res) => {
  res.status(404).send("Page Not Found");
});


// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);
