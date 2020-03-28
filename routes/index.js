const express = require("express"),
	  router = express.Router();

router.use("/add", require("./add.js"));
router.use("/list", require("./list.js"));
router.use("/delete", require("./delete.js"));

router.get("/", async(req, res) => {
	res.render("index", {
		pageName: "Home"
	});
});

module.exports = router;