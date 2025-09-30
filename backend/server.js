// Import necessary packages
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Groq = require('groq-sdk'); // Switched to Groq SDK
require('dotenv').config();

// Import document parsers
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

// --- SETUP ---
const app = express();
const port = 3001;

// Initialize the Groq AI Client
if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set in the .env file");
}
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const groqModel = "llama-3.1-8b-instant"; // Using a fast model from Groq

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

// --- HELPER FUNCTION to read document text ---
async function getDocumentText(file) {
    if (file.mimetype === 'application/pdf') {
        const data = await pdf(file.buffer);
        return data.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const { value } = await mammoth.extractRawText({ buffer: file.buffer });
        return value;
    } else if (file.mimetype === 'text/plain') {
        return file.buffer.toString('utf8');
    }
    return null;
}

// --- API ENDPOINTS ---

/**
 * @route   POST /api/chat
 * @desc    Handles chatbot conversation with the Law Advisor AI using Groq
 */
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        console.log("Received message from user:", message);

        const chatPrompt = `
            You are "Judicio," a world-class AI Legal Assistant. Your role is to provide clear, accurate, and helpful legal information.
            - Include a disclaimer in your first response: "Disclaimer: I am an AI assistant and cannot provide legal advice. Please consult with a qualified legal professional for your specific situation."
            - Format your response using HTML tags for better readability (<strong>, <ul>, <li>).
            User's Question: "${message}"
        `;
        
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: chatPrompt }],
            model: groqModel,
        });

        const text = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
        console.log("Raw response from AI:", text);
        res.json({ text });

    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ error: 'Failed to get a response from the AI model.' });
    }
});

/**
 * @route   POST /api/analyze-document
 * @desc    Analyzes an uploaded legal document using Groq
 */
app.post('/api/analyze-document', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No document uploaded.' });

        const documentText = await getDocumentText(req.file);
        if (!documentText) return res.status(400).json({ error: 'Unsupported file type.' });

        const analysisPrompt = `Analyze the following legal document text. Extract key information and provide your output ONLY in a valid JSON object format, following this exact schema:
            {
              "metrics": {"Parties Involved": "...", "Document Date": "...", "Court/Jurisdiction": "...", "Case Type": "..."},
              "summary": ["Point 1", "Point 2", "Point 3"],
              "highlights": [{"type": "Clause", "text": "..."}, {"type": "Argument", "text": "..."}, {"type": "Claim", "text": "..."}]
            }
            Document Text: """${documentText.substring(0, 8000)}"""`;

        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: analysisPrompt }],
            model: groqModel,
            response_format: { type: "json_object" },
        });

        const jsonResponse = JSON.parse(completion.choices[0]?.message?.content);
        res.json(jsonResponse);

    } catch (error) {
        console.error('Error in /api/analyze-document:', error);
        res.status(500).json({ error: 'Failed to analyze the document.' });
    }
});

/**
 * @route   POST /api/predict-outcome
 * @desc    Predicts the outcome of a legal case using Groq
 */
app.post('/api/predict-outcome', async (req, res) => {
    try {
        const { caseType, jurisdiction, summary } = req.body;
        const predictionPrompt = `Analyze the following case details and predict the outcome. Provide your output ONLY in a valid JSON object format with this exact schema:
            {
              "outcome": "'Plaintiff Win Likely', 'Defendant Win Likely', or 'Settlement Likely'",
              "probability": "An integer between 50 and 95",
              "reasoning": "A step-by-step explanation for your prediction.",
              "confidence": "An integer between 80 and 98"
            }
            Case Details: Type: ${caseType}, Jurisdiction: ${jurisdiction}, Summary: ${summary}`;

        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: predictionPrompt }],
            model: groqModel,
            response_format: { type: "json_object" },
        });
        
        const jsonResponse = JSON.parse(completion.choices[0]?.message?.content);
        res.json(jsonResponse);

    } catch (error) {
        console.error('Error in /api/predict-outcome:', error);
        res.status(500).json({ error: 'Failed to generate a prediction.' });
    }
});

/**
 * @route   POST /api/generate-arguments
 * @desc    Generates potential counterarguments for a case using Groq
 */
app.post('/api/generate-arguments', async (req, res) => {
    try {
        const { caseType, coreArgument } = req.body;
        const argumentPrompt = `Generate three distinct counterarguments for the following case. Provide your output ONLY in a valid JSON array format, where each object follows this schema:
            [
              {"argument": "...", "analysis": "...", "response": "..."},
              {"argument": "...", "analysis": "...", "response": "..."},
              {"argument": "...", "analysis": "...", "response": "..."}
            ]
            Case Details: Type: ${caseType}, User's Argument: ${coreArgument}`;

        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: argumentPrompt }],
            model: groqModel,
            response_format: { type: "json_object" }, // Note: Groq will still return a valid JSON array within the object
        });
        
        // The result is a string that needs to be parsed. Sometimes it's nested.
        let responseContent = completion.choices[0]?.message?.content;
        if (typeof responseContent === 'string') {
             // Handle cases where the JSON might be inside a markdown block
            responseContent = responseContent.replace(/```json/g, '').replace(/```/g, '').trim();
        }
       
        // The API might return the array inside a root key, let's find it
        const parsedJson = JSON.parse(responseContent);
        const jsonArray = Array.isArray(parsedJson) ? parsedJson : Object.values(parsedJson)[0];

        res.json(jsonArray);

    } catch (error) {
        console.error('Error in /api/generate-arguments:', error);
        res.status(500).json({ error: 'Failed to generate arguments.' });
    }
});


// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Judicio AI backend server listening on port ${PORT}`);
});

