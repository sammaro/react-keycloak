const express = require("express");
const app = express();
const cors = require('cors')
const pino = require('express-pino-logger')(); 

app.use(cors());
app.use(pino);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/getToken", (req, res) => {
  res.send({
    status: "sucess",
    message: "Token",
  });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
