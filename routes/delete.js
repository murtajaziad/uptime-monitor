const express = require("express"),
	  router = express.Router(),
	  URL = require("../models/urlSchema.js"),
	  methodOverride = require('method-override');

router.use(methodOverride('_method'))

router.delete("/:id", async (req, res) => {
	let id = req.params.id;
	if(!id) return res.redirect("/list");
	await URL.findOneAndDelete({ _id: id }).catch(_ => res.redirect("/list"));
	return res.redirect("/list")
});

module.exports = router