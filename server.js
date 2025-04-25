// backend/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { scheduleMessage } = require('./scheduler');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'messages.json');

// Carrega os agendamentos ao iniciar
function loadMessages() {
  if (!fs.existsSync(dbPath)) return [];
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

// Salva os agendamentos
function saveMessages(messages) {
  fs.writeFileSync(dbPath, JSON.stringify(messages, null, 2));
}

// Rota: listar agendamentos
app.get('/agendamentos', (req, res) => {
  const messages = loadMessages();
  res.json(messages);
});

// Rota: adicionar novo agendamento
app.post('/agendamentos', (req, res) => {
  const messages = loadMessages();
  const newMessage = req.body;
  newMessage.id = Date.now();
  messages.push(newMessage);
  saveMessages(messages);
  scheduleMessage(newMessage); // agenda o disparo
  res.json({ success: true });
});

// Rota: remover agendamento
app.delete('/agendamentos/:id', (req, res) => {
  let messages = loadMessages();
  const id = parseInt(req.params.id);
  messages = messages.filter(msg => msg.id !== id);
  saveMessages(messages);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
