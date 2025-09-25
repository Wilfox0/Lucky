

// 📌 إرسال إشعارات إلى تليجرام
export async function sendTelegramMessage(message) {
  const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    if (!response.ok) {
      console.error("Telegram message failed:", await response.text());
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
}
