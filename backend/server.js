const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// app.use(cors());
// Middleware
app.use(cors({
  origin: "https://exam-generator-frontend.vercel.app", // allow only your frontend
  methods: ["GET", "POST"]
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Generate exam endpoint
app.post('/generate-exam', async (req, res) => {
  try {
    const { topic, questionCount, gradeLevel, difficulty } = req.body;

    // Validate input
    if (!topic || !questionCount) {
      return res.status(400).json({
        error: 'Both topic and questionCount are required'
      });
    }

    if (questionCount < 1 || questionCount > 30) {
      return res.status(400).json({
        error: 'Question count must be between 1 and 30'
      });
    }
    if (!gradeLevel || gradeLevel < 1 || gradeLevel > 12) {
      return res.status(400).json({ error: 'Grade level must be between 1 and 12' });
    }

    if (!['easy', 'medium', 'hard'].includes(difficulty.toLowerCase())) {
      return res.status(400).json({ error: 'Difficulty must be easy, medium, or hard' });
    }

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'API key not configured. Please add GEMINI_API_KEY to .env file'
      });
    }

    // Create prompt for Gemini
    const prompt = `Generate a comprehensive exam with ${questionCount} questions 
for a grade/class ${gradeLevel} student.

Requirements:
- Subject/Topic: ${topic}
- Difficulty must reflect the chosen class/grade level (${difficulty})
- Each question should be numbered (1., 2., etc.)
- Questions should be age-appropriate and relevant to the core curriculum of the class
- Include a mix of question types:
  - Short Answer Questions (brief explanations, definitions, or calculations)
  - Long Answer / Essay Questions (detailed reasoning, problem-solving, derivations)
- Avoid diagrammatic questions
- Questions should progressively increase in difficulty for higher grades
- Keep wording clear and understandable
- Do NOT include the answers in the response
- Specify the variety of question type (short answer, long answer) inside the bracket at the end

Example question types for reference:

Short Answer:
Q.1. What are the two inherent characteristics of amoeba and yeast that favour asexual reproduction in them?
Why can’t multicellular organisms reproduce by cell division?

Long Answer / Problem-Solving:
Q.2. Find the area enclosed by the ellipse x²/a² + y²/b² = 1.
Q.3. Explain the process of cellular respiration and its significance in energy production.

Now generate ${questionCount} questions for grade/class ${gradeLevel} on the subject/topic of ${topic}, ensuring the questions are aligned with the grade level, focus on core topics, and include a mix of short and long answer questions.`;




    // Call Gemini API
    const response = await axios.post(
       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract the generated text
    const generatedText = response.data.candidates[0].content.parts[0].text;

    // Parse questions from the response
    const questions = parseQuestions(generatedText);

    res.json({
      topic,
      questionCount,
      questions,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating exam:', error.response?.data || error.message);

    if (error.response?.status === 400) {
      return res.status(400).json({
        error: 'Invalid request to AI service. Please check your inputs.'
      });
    }

    if (error.response?.status === 403) {
      return res.status(500).json({
        error: 'API key invalid or quota exceeded. Please check your Gemini API key.'
      });
    }

    res.status(500).json({
      error: 'Failed to generate exam. Please try again later.'
    });
  }
});

// Helper function to parse questions from AI response
function parseQuestions(text) {
  const lines = text.split('\n').filter(line => line.trim());
  const questions = [];

  lines.forEach(line => {
    // Look for numbered questions (1., 2., etc.)
    const questionMatch = line.match(/^\d+\.\s*(.+)/);
    if (questionMatch) {
      questions.push({
        id: questions.length + 1,
        question: questionMatch[1].trim()
      });
    }
  });

  return questions;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Make sure to set your GEMINI_API_KEY in the .env file');
});