const express = require("express");
const cors = require("cors");
const dbConfig = require("./db.config");
require('dotenv').config();
const PORT = process.env.PORT || 8085;

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
const User = db.user;

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
  User.count((err, count) => {
    if (!err && count < 1) {
      new User({
        username: 'aa',
        password: 'aaaa',
        email: 'aa@aa.aa',
        roles: 1
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'CREATOR' to roles collection");
      });

      new User({
        username: 'bb',
        email: 'bb@bb.bb',
        password: 'bbbb',
        roles: 2
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'VIEWER' to roles collection");
      });

      new User({
        username: 'cc',
        email: 'cc@cc.cc',
        password: 'cccc',
        roles: 3
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'VIEW_ALL' to roles collection");
      });
    }
  });
}

require('./app/routes/auth.routes')(app);
require('./app/routes/book.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});