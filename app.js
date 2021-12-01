// File : index.js

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require('https');

const app = express();
app.use(express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 

// var testJson = {
//     "ip_address": "76.68.52.228",
//     "country": "Canada",
//     "country_code": "CA",
//     "continent": "North America",
//     "continent_code": "NA",
//     "city": "Scarborough",
//     "county": null,
//     "region": "Ontario",
//     "region_code": "08",
//     "postal_code": "M1R",
//     "timezone": "America\/Toronto",
//     "owner": null,
//     "longitude": -79.3003,
//     "latitude": 43.7507,
//     "currency": "CAD",
//     "languages": [
//       "en-CA",
//       "fr-CA",
//       "iu"
//     ]
//   }
// var errorJson = {"error":"Invalid IP Address: 141.117.125.76auth=82102e4b-bfbf-4b4b-8255-19ab9e7b1496"}


// PORT
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  //res.json({ message: "API Working" });
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.post("/", (req, res) => {
  formInput = req.body.ipAddressInput

  urlstring ="https://api.ipfind.com/?ip=" + formInput + "&auth=82102e4b-bfbf-4b4b-8255-19ab9e7b1496";

  if (ValidateIPaddress(formInput)) {
    https
      .get(urlstring, (apiRes) => {
        var body = "";

        apiRes.on("data", (chunk) => {
          body += chunk;
        });

        apiRes.on("end", () => {
          try {
            var jsonReturned = JSON.parse(body);
            res.send(jsonReturned);
          } catch (error) {
            console.error(error.message);
          }
        });
      })
      .on("error", (error) => {
        console.error(error.message);
      });
  } else {
    res.send(false);
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

function ValidateIPaddress(ipaddress) 
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return (true)
  }
return (false)
}

