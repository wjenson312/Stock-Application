const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const services = require("../server/render.js");
const controller = require("./controller.js");

router.get("/", services.homeRoute);
router.get("/download-page", services.download_page);
router.get("/about", services.about_page);

// API
router.post("/api/stocks", controller.create);
router.get("/api/stocks", controller.find);
router.delete("/api/stocks", controller.delete);

module.exports = router;
