import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connecté ✅"))
.catch(err => console.error("Erreur MongoDB ❌", err));

// Schéma pour les messages contact
const contactSchema = new mongoose.Schema({
    nom: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// Route de paiement simulé
app.post("/payer", (req, res) => {
    const { panier } = req.body;
    if(!panier || panier.length === 0) return res.status(400).json({ message: "Panier vide !" });

    // Ici tu peux intégrer PayPal, Stripe ou autre
    console.log("Panier reçu pour paiement:", panier);
    res.json({ message: "Paiement simulé avec succès ✅" });
});

// Route contact
app.post("/contact", async (req, res) => {
    try {
        const { nom, email, message } = req.body;
        const nouveauMessage = new Contact({ nom, email, message });
        await nouveauMessage.save();
        res.json({ message: "Message envoyé avec succès ✅" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur ❌" });
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server démarré sur http://localhost:${PORT}`);
});
