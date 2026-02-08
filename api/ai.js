import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const question = req.query.q || "Ahoj";

  // Přečteme obsah.txt
  const text = fs.readFileSync("obsah.txt", "utf-8");

  // Požadavek na AI
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Ty jsi nápomocná AI." },
      { role: "user", content: `Text webu: ${text}\nOtázka: ${question}` },
    ],
  });

  res.json({ answer: completion.choices[0].message.content });
}
