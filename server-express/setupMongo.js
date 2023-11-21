const mongoose = require("mongoose");

function connect() {
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(process.env.DB_URI, options).then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}

module.exports = connect;
