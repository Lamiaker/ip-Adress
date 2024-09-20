const express = require("express");
const app = express();
const cors = require("cors");

// !----------------------------
// chatgpt rah mbloki address local fhmti ?

// app.use(cors({	origin: 'http://localhost:5173' }));
app.use(cors());
// !----------------------------

app.get("/", (req, res) => {
  // Retrieve the IP address
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  res.send(`Your IP address is: ${ip}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
