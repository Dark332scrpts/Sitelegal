export default async function handler(req, res) {

  const { msg } = req.body || {};

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: msg }]
          }
        ]
      })
    }
  );

  const data = await response.json();

  const resposta =
    data.candidates?.[0]?.content?.parts?.[0]?.text;

  res.status(200).json({
    resposta: resposta || "Erro na resposta"
  });
}
