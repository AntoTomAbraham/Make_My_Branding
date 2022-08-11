const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const main = require("./lib/main.js");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", main);

app.get("/", (req, res) => {
  res.send("Welcome to my code compiler...........");
});

if(process.env.NODE_ENV =="production"){
  app.use(express.static('static/build'));
  const path=require("path");
  app.get("*",(req,res)=>{
    res.sendFile('client','build','index.html');
  })
}

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
