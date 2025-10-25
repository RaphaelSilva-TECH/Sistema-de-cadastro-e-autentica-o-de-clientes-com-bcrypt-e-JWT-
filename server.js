require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log("MongoDB conectado"))
  .catch(err => console.error("Erro conectando ao MongoDB:", err));

// Rotas abertas
app.use("/api/auth", authRoutes);

// Rota protegida de exemplo
app.get("/api/profile", authMiddleware, async (req, res) => {
  // req.user foi preenchido pelo middleware
  const User = require("./models/User");
  const user = await User.findById(req.user.id).select("-passwordHash");
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json({ user });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server rodando na porta ${port}`));
