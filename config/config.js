let mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/qashit", {
    //useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected successfully !"))
  .catch((err) => console.log("Something Went Wrong", err));
