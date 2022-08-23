var express = require("express");
var router = express.Router();
const Axios = require("axios").default;
var qs = require("qs");
const csv = require('csv-parser')
const fs = require('fs')



//var token="e086af37-4c1f-46f8-8220-da63ee5d6321";
var token = "";
var array = [];
var unique = [];


router.post("/getOverview", async function (req, res, next) {
  try {
    array=[];
    unique=[];
    cityResults=[];

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
          if (element["poi"] != "") {
            array.push(element["poi"]);
          }
          unique = array.filter((v, i, a) => a.indexOf(v) === i);
        });
      })
      .catch((err) => console.log(err));
      console.log(unique);

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

const results = [];
var cityResult=[];
var uniquecityResult=[];

router.post("/readCsv", async function (req, res) {
fs.createReadStream('model/data.csv')
  .pipe(csv({}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    cityResult=[];
    results.forEach(function(element,index){
      if(element['﻿Location']=== req.body.city){
        cityResult.push(element);
      }
    })
    uniquecityResult = cityResult.filter((v, i, a) => a.indexOf(v) === i);
    console.log("Uniqure city result")
    console.log(uniquecityResult);
    return res.json({
      success: true,
      response: {
        cityResult: uniquecityResult,
      },
    });
});
});

const resultsSize = [];
var sizeResult=[];
var uniquesizeResult=[];

//ReadSize

router.post("/readSize", async function (req, res) {
  fs.createReadStream('model/data.csv')
    .pipe(csv({}))
    .on('data', (data) => resultsSize.push(data))
    .on('end', () => {
      sizeResult=[];
      resultsSize.forEach(function(element,index){
        if(element['﻿Location']=== req.body.city){
          //sizeResult.push(element['Size(sqft)']);
          sizeResult.push({
            "value":  element['Size(sqft)'],
              "label": element['Size(sqft)'],
          })
        }
      })
      uniquesizeResult = sizeResult.filter((v, i, a) => a.indexOf(v) === i);
      console.log("Uniqure city result")
      console.log(uniquesizeResult);
      return res.json({
        success: true,
        response: {
          sizeResult: uniquesizeResult,
        },
      });
  });
  });

  const resultLight = [];
  var lightResult=[];
  var uniquelightResult=[];
  //ReadLight

  router.post("/readLight", async function (req, res) {
    fs.createReadStream('model/data.csv')
      .pipe(csv({}))
      .on('data', (data) => resultLight.push(data))
      .on('end', () => {
        lightResult=[];
        resultLight.forEach(function(element,index){
          if(element['﻿Location']=== req.body.city){
            lightResult.push({
              "value":  element['Light'],
              "label": element['Light'],
              });
          }
        })
        uniquelightResult = lightResult.filter((v, i, a) => a.indexOf(v) === i);
        console.log("Uniqure city result")
        console.log(uniquelightResult);
        return res.json({
          success: true,
          response: {
            sizeResult: uniquelightResult,
          },
        });
    });
    });
    
    const resultloctype = [];
    var  loctypeResult=[];
    var uniqueloctypeResult=[];
    //ReadLocationtype

      router.post("/readLocationtype", async function (req, res) {
        fs.createReadStream('model/data.csv')
          .pipe(csv({}))
          .on('data', (data) => resultloctype.push(data))
          .on('end', () => {
            sizeResult=[];
            resultloctype.forEach(function(element,index){
              if(element['﻿Location']=== req.body.city){
                //loctypeResult.push(element['LocationType']);
                loctypeResult.push({
                  "value":  element['LocationType'],
                  "label": element['LocationType'],
                  })
              }
            })
            uniqueloctypeResult = loctypeResult.filter((v, i, a) => a.indexOf(v) === i);
            console.log("Uniqure city result")
            console.log(uniqueloctypeResult);
            return res.json({
              success: true,
              response: {
                sizeResult: uniqueloctypeResult,
              },
            });
        });
        });

        const resultsNature = [];
        var natureResult=[];
        var uniquenatureResult=[];
        //ReadNatureOfLocation

        router.post("/readNatureOfLocation", async function (req, res) {
          fs.createReadStream('model/data.csv')
            .pipe(csv({}))
            .on('data', (data) => resultsNature.push(data))
            .on('end', () => {
              resultsNature.forEach(function(element,index){
                console.log(element)
                if(element['﻿Location']=== req.body.city){
                  natureResult.push({
                  "value":  element['NatureOfLocation'],
                  "label": element['NatureOfLocation'],
                  }
                    );
                }
              })
              console.log(natureResult)
              uniquenatureResult = natureResult.filter((v, i, a) => a.indexOf(v) === i);
              return res.json({
                success: true,
                response: {
                  sizeResult: uniquenatureResult,
                },
              });
          });
          });

module.exports = router;
