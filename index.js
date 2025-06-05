const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PCLOUD_TOKEN = "abnMmXZYwpn7ZJFySblILPakzLJRg3jrJIQoM3xOy";

app.get("/", (req, res) => {
  res.json({ message: "Connecteur GPT ↔ pCloud actif" });
});

app.get("/list", async (req, res) => {
  try {
    const response = await axios.get("https://api.pcloud.com/listfolder", {
      params: {
        auth: PCLOUD_TOKEN,
        folderid: 0,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/mkdir", async (req, res) => {
  const { name } = req.body;
  try {
    const response = await axios.get("https://api.pcloud.com/createfolderifnotexists", {
      params: {
        auth: PCLOUD_TOKEN,
        name,
        folderid: 0,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur MCP démarré sur le port ${port}`);
});
