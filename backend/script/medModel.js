require("dotenv").config();
const axios = require("axios");

const CONDITIONS = [
  "diabetes",
  "hypertension",
  "anemia",
  "allergies"
];

async function detectCondition(userMessage) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/BAAI/bge-m3",
      {
        inputs: {
          source_sentence: userMessage,
          sentences: CONDITIONS,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const scores = response.data;
    const maxIndex = scores.indexOf(Math.max(...scores));
    const bestCondition = CONDITIONS[maxIndex];

    console.log("Best match:", bestCondition);
    return bestCondition;
  } catch (err) {
    console.error("Error in detectCondition:", err.response?.data || err.message);
    throw new Error("Failed to detect health condition.");
  }
}

module.exports = { detectCondition };
