const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.static('public'))

//app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header(
    //"Access-Control-Allow-Headers",
    //"Origin, X-Requested-With, Content-Type, Accept"
  //);
  //next();
//});
//http://localhost:5000/quiz#access_token=o59-Vk19h25OmNQorVAhGHuFWUFrYlnQ&expires_in=7200&token_type=Bearer&state=EmxsNIOO6nJGH~-J-5413hHrAJSGBL19&id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJEQTROakJGUVRCRE5qaENSa1l3TUVKRU0wVkJOelkxT0VFMU0wVTJSRGczTlVZeE9EQkZSZyJ9.eyJpc3MiOiJodHRwczovL2lkZWUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA3NjM3MTE1NzUzMDI3ODEyOTMyIiwiYXVkIjoicEtWZnNObXdLOXRsY1Z2U3ZkSzlwTDVXMWt1V3Mwc3AiLCJpYXQiOjE1NDE2MDg5NTUsImV4cCI6MTU0MTY0NDk1NSwiYXRfaGFzaCI6IlNTWno2Q3NQbGl0S1E0NWhOOHFQVmciLCJub25jZSI6ImNicUJGVmVHWmQxLXd-RX45djhpUnRzdTluZ1RaZTFDIn0.GqXFpzOYZKaCIW7ThHgCRv_7DAwuc69hc1yYUrplEiqrfTXQWzfTQKjQBBmGJv2EyTum-TDEau8QwBJMYXT3_ViO6HZuKZiLmT_kzKYzGszV0s15viM187AWURneSv4gzxS0bEHNVYafPBEoto3ijIb2QImYUTI72P0Rw_c8Dtd3sVXPD3p2wajEwgjJIVa-1OHb666GUDAbJjAv2DVihDEZJ178qqkABnB-Zo3t5ICsSY_PQaK4FppWH5E1_FPucSyZMINSTsk7ziMr1IH2P_zsRXKUcgXqiQP8bqSTjHYHa-tGCTogx1aV9EfcJgt_ENXeu_72UO29l8rZwGI1LQ
// root endpoint
app.get("/quiz", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/public/questions.html"));
});

app.get("/quiz-questions", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/json/index.json"));
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// select the port in which your Node.js web app will run
const port = 5000;

// then listen to the selected port
app.listen(port, () => console.log(`Server is running on port ${port}`));
