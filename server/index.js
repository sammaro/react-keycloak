const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

const cors = require("cors");

const port = 4001;
const url = "http://apitst.caja.com:8280";

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
  var buf = Buffer.from(req.body.auth, "base64");
  var dec = buf.toString("ascii");
  var salida;
  const ambiente = "POLARIS Testeo IE7.Cas(.*)";
  var permisos = dec.split("##");

  if (permisos.length > 1) {
    permisos.map((permiso) => {
      if (permiso.matchAll(ambiente)) {
        var salida = permiso.includes("$")
          ? permiso.substring(permiso.indexOf("$") + 1, permiso.length)
          : permiso;
        console.log(salida);
      }
    });
  } else {
    var out = permisos[0];
    salida = out.includes("$")
      ? out.substring(out.indexOf("$") + 1, out.length)
      : out;
  }

  var config = {
    method: "post",
    url: `${url}/token?grant_type=client_credentials`,
    headers: {
      Authorization:
        "Basic SXhmZVpOcW5oTmxObDl4T0pFZ0xOb2Z6WnVVYTpSMkNqdHNLUDZuUE9NY1J1aHkwckpGQzN5dTRh",
    },
  };

  axios(config)
    .then(function(response) {
      res.json({
        token: response.data.access_token,
        userId: salida.toUpperCase(),
        baseUrl: url,
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get("/api/verPerfil", (req, res) => {
  var config = {
    method: "GET",
    url: `http://apitst.caja.com:8280/api-documentacion-digital-admin/v1/perfil/iduser/${req.headers.userId}`,
    headers: {
      Authorization: `Bearer ${req.headers.token}`,
    },
  };

  axios(config)
    .then(function(response) {
      res.json({
        data: response.data,
      });
    })
    .catch(function(error) {
      console.log(error);
      return Promise.reject(error);
    });
});

app.get("/api/getListado", (req, res) => {
  var config = {
    method: "GET",
    url: `http://apitst.caja.com:8280/api-documentacion-digital-admin/v1/grupo/lista/iduser/${req.headers.userId}/sistema/7`,
    headers: {
      Authorization: `Bearer ${req.headers.token}`,
    },
  };

  axios(config)
    .then(function(response) {
      res.json({
        data: response.data,
      });
    })
    .catch(function(error) {
      console.log(error);
      return Promise.reject(error);
    });
});
