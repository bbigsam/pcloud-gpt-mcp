// api/index.js
// Handler Vercel pour exposer /api en GET (liste des fichiers) et POST (create folder)
const axios = require("axios");

module.exports = async (req, res) => {
  const PCLOUD_TOKEN = "abnMmXZYwpn7ZJFySblILPakzLJRg3jrJIQoM3xOy"; // Ton token d’auth pCloud

  if (req.method === "GET") {
    // GET /api → liste des fichiers dans le dossier racine de pCloud
    try {
      const response = await axios.get("https://api.pcloud.com/listfolder", {
        params: { auth: PCLOUD_TOKEN, folderid: 0 },
      });
      return res.status(200).json(response.data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    // POST /api { "name": "mon-nouveau-dossier" } → crée un dossier
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Le paramètre 'name' est requis" });
    }
    try {
      const response = await axios.get("https://api.pcloud.com/createfolderifnotexists", {
        params: { auth: PCLOUD_TOKEN, name, folderid: 0 },
      });
      return res.status(200).json(response.data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Toute autre méthode n’est pas autorisée
  res.status(405).json({ error: "Méthode non autorisée" });
};
