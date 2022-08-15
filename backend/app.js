const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const path=require("path");
const main = require("./lib/main.js");
const bodyParser = require("body-parser");
const dotenv = require('dotenv')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", main);
dotenv.config();

// --------------------Depolyment----------------------------

const dirName=path.resolve()
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(dirName ,"/frontend/build")))
  app.get("*",(req, res)=>{
    res.sendFile(path.resolve(dirName , 'frontend','build','index.html'));
  })
}else{
  app.get("/",(req,res)=>{
    res.send("Api is running sucessful")
  })
}

//

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
