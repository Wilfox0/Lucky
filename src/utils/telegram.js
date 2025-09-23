// 📌 إرسال إشعارات إلى تليجرام
export async function sendTelegramMessage(message) {
  const botToken = "YOUR_BOT_TOKEN";
  const chatId = "YOUR_CHAT_ID";

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });
}
