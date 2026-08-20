const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const services = require("../server/render.js");
const controller = require("./controller.js");
const requireAdminKey = require("./auth.js");

router.get("/", services.homeRoute);
router.get("/download-page", services.download_page);
router.get("/about", services.about_page);

// API
router.post("/api/stocks", requireAdminKey, controller.create);
router.get("/api/stocks", controller.find);
router.delete("/api/stocks", requireAdminKey, controller.delete);

module.exports = router;
