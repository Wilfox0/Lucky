export async function sendTelegramMessage(message) {
  const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });
  } catch (error) {
    console.error("Telegram message failed:", error);
  }
}
