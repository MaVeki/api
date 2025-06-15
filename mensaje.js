import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Generá un mensaje estilo chat de stream, random, caótico, irónico, gracioso, sin mencionar ningún juego ni horario. Suena humano.",
        },
        {
          role: "user",
          content: "Dame uno.",
        },
      ],
      max_tokens: 80,
    });

    const msg = completion.choices[0].message.content.trim();
    res.status(200).json({ mensaje: msg });
  } catch (err) {
    console.error("❌ Error con OpenAI:", err);
    res.status(500).json({ mensaje: "Error generando mensaje IA." });
  }
}
