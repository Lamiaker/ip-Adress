const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

// Activer CORS pour permettre les requêtes du front-end
app.use(cors());

app.get("/", async (req, res) => {
  // Récupérer l'adresse IP du client
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress).split(
    ","
  )[0];

  try {
    // Appeler l'API de géolocalisation avec l'adresse IP
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const locationData = response.data;

    // Envoyer les données de localisation au client
    res.json({
      ip: ip,
      country: locationData.country,
      region: locationData.regionName,
      city: locationData.city,
      lat: locationData.lat,
      lon: locationData.lon,
      isp: locationData.isp,
    });
    res.send(locationData);
  } catch (error) {
    console.error("Error fetching IP location:", error);
    res.status(500).send("Error fetching IP location.");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
