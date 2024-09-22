const express = require("express");
const ipToLocation = require("ip-to-location");
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
    // Utiliser ip-to-location pour obtenir les informations de géolocalisation
    const locationData = await ipToLocation.fetch(ip);

    // Envoyer les données de localisation au client
    res.json({
      ip: ip,
      country: locationData.country,
      region: locationData.region,
      city: locationData.city,
      lat: locationData.latitude,
      lon: locationData.longitude,
    });
  } catch (error) {
    console.error("Error fetching IP location:", error);
    res.status(500).send("Error fetching IP location.");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
