const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Ensure Axios is imported

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  console.log("request" + JSON.stringify(req.body))
  const { username, secret, email, first_name, last_name } = req.body;

  // Ensure all required fields are provided
  if (!username ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: secret, first_name:username },
      { headers: { "Private-Key": "823bd15f-3e07-44bb-9ab6-adc681bb2a6c" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    // Check if e.response exists to avoid accessing properties of undefined
    if (e.response) {
      return res.status(e.response.status).json(e.response.data);
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
