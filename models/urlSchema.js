const mongoose = require("mongoose");

let urlSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true
	},
	uptime: {
		type: Array,
		required: true,
		default: []
	}
});

module.exports = mongoose.model("url", urlSchema);