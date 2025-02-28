const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.GOOGLE_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

function extractCorrectedText(responseText) {
    const match = responseText.match(/\*\*(.*?)\*\*/);
    return match ? match[1] : "No corrections found.";
}

exports.checkGrammar = async (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        let data = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": `please correct my grammar: ${text}`
                        }
                    ]
                }
            ]
        };

        const response = await axios.post(url, data);
        const correctedText = extractCorrectedText(response.data.candidates[0].content.parts[0].text);

        return res.json({ corrected: correctedText });
    } catch (error) {
        console.error("Google AI Error:", error.response?.data || error.message);
        res.status(500).json({
            error: "Grammar check failed",
            details: error.response?.data || error.message
        });
    }
};
