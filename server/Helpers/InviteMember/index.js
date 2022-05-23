const axios = require("axios");

const inviteMember = async ({ cookie, email }) => {
  const url = `${process.env.SITE_URL}ghost/api/canary/admin/invites/`;
  const headers = {
    cookie,
  };
  const payload = {
    invites: [
      {
        token: null,
        email,
        expires: null,
        status: true,
        role_id: process.env.ROLE_ID || "61e24cb56979ca6a2d7ed25d",
      },
    ],
  };
  const res = await axios.post(url, payload, { headers });
  return res.data;
};

module.exports = inviteMember;
