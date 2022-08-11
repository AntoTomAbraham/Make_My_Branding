var express = require("express");
var router = express.Router();
const Axios = require("axios").default;
var qs = require("qs");

//var token="e086af37-4c1f-46f8-8220-da63ee5d6321";
var token = "";
var array = [];
var unique = [];

router.post("/getOverview", async function (req, res, next) {
  try {
    array=[];
    unique=[];
    //Create Token
    var data = qs.stringify({
      grant_type: "client_credentials",
      client_id:
        "33OkryzDZsJqbssP7gXRx1X4OZq40T9H061DvgeinEmn_KCA0rAI2T7iQ-hSe5TxvrYn3B68lkEXt-sE4EAuwxC2CJaQyycG",
      client_secret:
        "lrFxI-iSEg90etE_jBC6nC9kqSi0-1VrTEY4bLgkGjwtoj11pAxAdOfhsI51eRWFsIkIY2w960WL9sDnyZ5r1IsIsSTyUvWca05Fi1a41bM=",
    });
    var tokenConfig = {
      method: "post",
      url: "https://outpost.mapmyindia.com/api/security/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    await Axios(tokenConfig)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var data = response.data;
        console.log(data["access_token"]);
        token = data["access_token"];
        console.log("token");
        console.log(token);
      })
      .catch(function (error) {
        console.log(error);
      });
    //API request to get poi
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log("req body")
    console.log(req.body.city);
    await Axios.get(
      `https://atlas.mapmyindia.com/api/places/geocode?address=${req.body.city}&itemCount=50&podFilter=poi`,
      config
    )
      .then(function (response) {
        response.data.copResults.forEach(function (element, index) {
            console.log(element);
          if (element["poi"] != "") {
            array.push(element["poi"]);
          }
          unique = array.filter((v, i, a) => a.indexOf(v) === i);
        });
      })
      .catch((err) => console.log(err));
      console.log(unique);
    //Response Statement
    return res.json({
      success: true,
      response: {
        poi: unique,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
