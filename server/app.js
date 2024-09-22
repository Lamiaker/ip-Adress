app.get("/", async (req, res) => {
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress).split(
    ","
  )[0];

  try {
    // Utiliser ip-to-location pour obtenir les informations de géolocalisation
    const locationData = await ipToLocation.fetch(ip);

    // Afficher les données de géolocalisation dans la console pour débogage
    console.log("Location data:", locationData);

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
