require("dotenv").config()
const express = require("express");
const app = express();
const axios = require("axios");
const newsApiToken = process.env.NEWS_TOKEN;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("crypto api");
});
app.get("/news", (req, res) => {
  axios
    .get(`https://cryptopanic.com/api/v1/posts/?auth_token=${newsApiToken}`)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get("/news/:coin", (req, res) => {
  const coin = req.params.coin.toString().toUpperCase();
  axios
    .get(
      `https://cryptopanic.com/api/v1/posts/?auth_token=${newsApiToken}&currencies=${coin}`
    )
    .then((result) => {
      const data = result.data
      res.json({ ...data });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = {
  path: "/api",
  handler: app,
};
