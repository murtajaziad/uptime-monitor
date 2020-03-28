const axios = require("axios").default,
	  URL = require("./models/urlSchema.js"),
	  nodemailer = require("nodemailer"),
	  config = require("./config.json");

setInterval(async () => {
	let urlList = await URL.find();
	urlList.forEach(async url => {
			let res = await axios.get(url.url).catch(async e => {
			url.uptime.push({ status: "down", time: Date.now() });
			url.save()
			if (url.uptime.length == 0 || url.uptime.reverse()[0].status == "up") {
				try {
					let transporter = nodemailer.createTransport({
					    host: "smtp.zoho.com",
					    port: 587,
					    secure: false, 
					    auth: {
					      user: config.email, 
					      pass: config.password
					    }
					});

					let info = await transporter.sendMail({
				        from: '"Uptime monitor" <uptime@murtajaziad.xyz>', 
				    	to: "3edb5763c0@emailtown.club", 
				        subject: "Site is down!", 
				        text: `${url.url} is down with status ${e.response.status}`,
				        html: `<p>${url.url} is down with status ${e.response.status}</p>`
					});	
				} catch(e) {
					console.error(e)
				}
			}
			return false;
		})

		if(res != false) {
			if(url.uptime.length == 0 || url.uptime.reverse()[0].status == "down") {
				try {
					let transporter = nodemailer.createTransport({
					    host: "smtp.zoho.com",
					    port: 587,
					    secure: false, 
					    auth: {
					      user: config.email, 
					      pass: config.password
					    }
					});
					let info = await transporter.sendMail({
				        from: '"Uptime monitor" <uptime@murtajaziad.xyz>', 
				    	to: "3edb5763c0@emailtown.club", 
				        subject: "Site is up!", 
				        text: `${url.url} is up with status ${res.status}`,
				        html: `<p>${url.url} is up with status ${res.status}</p>`
					});
					await url.uptime.push({ status: "up", time: Date.now() });
					await url.save()
				} catch(e) {
					await url.uptime.push({ status: "up", time: Date.now() });
					await url.save()
					console.error(e)
				}
			}
		}
	})
//}, 1000 * 60 * 5)
}, 5000);