const express = require("express");
const route = require('./src/router');
const mongoose = require("mongoose");
 const app = express();
 app.use(express.json());

mongoose.set('strictQuery', true);
 mongoose
  .connect(
    "mongodb+srv://yashrajsinh09:yashraj2727@assignment.lhpfmud.mongodb.net/Project",
    { UseNewUrlParser: true }
  )
  .then(() => console.log("Mongo-Db is connected"))
  .catch((err) => console.log(err.message))

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("listening at " + (process.env.PORT || 3000))})