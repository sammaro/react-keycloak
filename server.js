const express = require("express");
const app = express();
const cors = require('cors')
 
app.use(cors())


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getToken", (req, res) => {
  res.send({
    status: "sucess",
    message: "Token",
  });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
