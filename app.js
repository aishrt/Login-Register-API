"use strict";

let express = require("express");

let cors = require("cors");

const app = express();
const port = 4000;

// CORS Policy
app.use(cors());

// JSON
app.use(express.json());

//routes
require("./router/route.js")(app);

require("./config/config.js");

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
