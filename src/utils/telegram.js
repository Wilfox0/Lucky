// 📌 إرسال إشعارات إلى تليجرام
export async function sendTelegramMessage(message) {
  const botToken = "8351490932:AAGJ7JRAFLCG5g-qo-VHzCP0-vqjL1GVn7w
";
  const chatId = "1092353140";

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });
}
