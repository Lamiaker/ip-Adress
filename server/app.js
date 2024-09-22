const express = require("express");
const geoip = require("geoip-lite");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress).split(
    ","
  )[0];

  // Utiliser geoip-lite pour obtenir les informations de géolocalisation
  const locationData = geoip.lookup(ip);

  if (locationData) {
    res.json({
      ip: ip,
      country: locationData.country,
      region: locationData.region,
      city: locationData.city,
      lat: locationData.ll[0],
      lon: locationData.ll[1],
    });
  } else {
    res.status(500).send("No location data found for this IP.");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
