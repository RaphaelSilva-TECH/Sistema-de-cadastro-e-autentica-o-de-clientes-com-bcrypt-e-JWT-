const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

// resgistro
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "Email já cadastrado." });

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ name, email: email.toLowerCase(), passwordHash });
    await user.save();

    return res.status(201).json({ message: "Usuário criado com sucesso", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email e senha são obrigatórios." });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Credenciais inválidas." });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: "Credenciais inválidas." });

    // Token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: jwtExpiresIn });

    return res.json({
      message: "Autenticado com sucesso",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;
