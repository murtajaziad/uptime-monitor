const express = require("express"),
	  router = express.Router(),
	  URL = require("../models/urlSchema");

router.get("/", async (req, res) => {
	let urls = await URL.find();
	res.render("list", {
		pageName: "List",
		urls: urls
	});
});

module.exports = router;