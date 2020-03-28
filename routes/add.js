const express = require("express"),
	  router = express.Router(),
	  URL = require("../models/urlSchema.js");

router.post("/", async (req,res) => {
	let url = req.body.url;
	if(!url) return res.redirect("/");
	let Url = new URL({
		url: url
	});
	Url.save();
	return res.redirect("/list")
});

module.exports = router;