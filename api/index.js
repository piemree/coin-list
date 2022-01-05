const express = require("express");
const app = express();
const axios = require("axios");
const newsApiToken = "7b871bf49ae28bfdb7f2a5b3d9a78aea40bd75db";
const cors = require('cors');
app.use(cors())
app.get("/test", (req, res) => {
  res.send("crypto api");
});
app.get("/news", (req, res) => {
  axios
    .get(
      `https://cryptopanic.com/api/v1/posts/?auth_token=${newsApiToken}`
    )
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get("/news/:coin", (req, res) => {
  const coin = req.params.coin.toUpperCase();
  console.log(coin);
  axios
    .get(
      `https://cryptopanic.com/api/v1/posts/?auth_token=${newsApiToken}&currencies=${coin}}`
    )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = {
    path: '/myapi',
    handler: app,
  }