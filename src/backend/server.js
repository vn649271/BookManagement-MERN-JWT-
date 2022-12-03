const express = require("express");
const cors = require("cors");
const dbConfig = require("./db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.count((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "CREATOR"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'CREATOR' to roles collection");
      });

      new Role({
        name: "VIEWER"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'VIEWER' to roles collection");
      });

      new Role({
        name: "VIEW_ALL"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'VIEW_ALL' to roles collection");
      });
    }
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to bezkoder application."
  });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});