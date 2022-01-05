// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

const cors = require("cors");

const host = "localhost";
const port = 4001;
const url = "https://apitst.lacaja.com.ar";

app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/post-test", (req, res) => {
  console.log("Got body:", req.params);
  res.sendStatus(200);
});

app.post("/api/info", (req, res) => {
  // console.log(req.params);
  console.log(req.body.auth);
  var buf = Buffer.from(req.body.auth, "base64");
  console.log(buf.toString("ascii"));
  var dec = buf.toString("ascii");
  var salida;
  const ambiente = "POLARIS Testeo IE7.Cas(.*)";
  var permisos= dec.split("##");
  

  if (permisos.length > 1) {
    console.log("paso >1");
    permisos.map((permiso) => {
       if (permiso.matchAll(ambiente)) {
         var salida = permiso.includes("$")
           ? permiso.substring(permiso.indexOf("$") + 1, permiso.length)
           : permiso;
         console.log(salida);
       }
    console.log(permiso.match(ambiente));
    console.log(permiso);
    });
  } else {
    var out = permisos[0];
    salida = out.includes("$")
      ? out.substring(out.indexOf("$") + 1, out.length)
      : out;

    console.log(salida);
  }

    var config = {
      method: "post",
      url: `${url}/token?grant_type=client_credentials`,
      headers: {
        Authorization:
          "Basic aEFZRWx3clEzZlV6ZjZtc181aHRmbU1peDJJYTp4emRXTE1oV0tEUUc1VVFVX3BFbERWZEdFZm9h",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.json({
            token: response.data.access_token,
            userId: salida.toUpperCase(),
            baseUrl: url,
          });
      })
      .catch(function (error) {
        console.log(error);
      });

});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});