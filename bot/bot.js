const venom = require('venom-bot');

let client = null;

venom
  .create({
    session: 'agenda-bot',
    headless: true,
    args: ['--headless=new', '--no-sandbox', '--disable-setuid-sandbox'],
    puppeteerOptions: {
      headless: 'new',
    },
  })
  .then((venomClient) => {
    client = venomClient;
    console.log('✅ Bot do WhatsApp iniciado com sucesso!');
  })
  .catch((error) => {
    console.error('❌ Erro ao iniciar o bot:', error);
  });

function sendMessage(msg) {
  if (!client) {
    console.error('⚠️ Cliente Venom não está pronto ainda.');
    return;
  }

  const { phone, message, cliente, carro } = msg;
  const finalMessage = `👤 Cliente: ${cliente}\n🚗 Carro: ${carro}\n📩 Mensagem: ${message}`;

  client
    .sendText(`${phone}@c.us`, finalMessage)
    .then(() => console.log(`✅ Mensagem enviada para ${phone}`))
    .catch((err) => console.error('❌ Erro ao enviar mensagem:', err));
}

module.exports = { sendMessage };
