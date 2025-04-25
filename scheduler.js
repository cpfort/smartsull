// backend/scheduler.js
const { sendMessage } = require('./bot/bot');

const scheduledJobs = new Map();

function scheduleMessage(msg) {
  const delay = new Date(msg.dateTime).getTime() - Date.now();
  if (delay < 0) return; // Não agenda se já passou

  const timeout = setTimeout(() => {
    sendMessage(msg);
    scheduledJobs.delete(msg.id);
  }, delay);

  scheduledJobs.set(msg.id, timeout);
}

function initializeScheduler(messages) {
  messages.forEach(scheduleMessage);
}

module.exports = {
  scheduleMessage,
  initializeScheduler
};