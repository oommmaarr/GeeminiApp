import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = "AIzaSyA_IDpccaS5T528sJAlKnHIVQL11knm0As";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      // يمكنك إضافة تاريخ المحادثة هنا إذا لزم الأمر
    ],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text(); // تأكد من استخدام await هنا
    console.log(responseText);
    return responseText;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error; // لإعادة رمي الخطأ لالتقاطه في مكان آخر
  }
}

export default run;
