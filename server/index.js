require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const inviteMember = require("./Helpers/InviteMember");

const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const createSession = async () => {
	const username = process.env.USER_NAME;
	const password = process.env.USER_PASSWORD;
	console.log("createSession");
	const url = `${process.env.SITE_URL}ghost/api/canary/admin/session`;
	const res = await axios.post(url, { username, password });
	return res.headers["set-cookie"];
};

app.get("/", (req, res) => {
	res.send("<h1>Server is Active</h1>");
});

app.post("/member-added", async (req, res) => {
	console.log("POST /member-added");
	try {
		const {
			member: {
				current: { email },
			},
		} = req.body;

		const cookie = await createSession();
		const response = await inviteMember({ cookie, email });
		console.log("response", response);
		return res.send(response);
	} catch (error) {
		console.log("error", error);
		return res.send(error);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
