# AI Exam Paper Generator

A full-stack web application that allows primary school math teachers to generate custom math exams using AI. Built with React (frontend) and Node.js/Express (backend), integrated with Google's Gemini AI.

## 🚀 Features

- **AI-Powered Question Generation**: Uses Google Gemini AI to create age-appropriate math questions
- **Multiple Math Topics**: Addition, Subtraction, Multiplication, Division, Fractions, Decimals, Word Problems, Geometry, Time & Money, Measurement, Data & Graphs
- **Customizable Parameters**: Choose number of questions (1-20) and grade level
- **Professional Exam Layout**: Clean, printable exam format with student information fields
- **Export Options**: Print directly or download as text file
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: User-friendly error messages with retry options

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **Axios** - HTTP client
- **CSS3** - Styling with modern features (backdrop-filter, gradients)
- **Font Awesome** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Axios** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### AI Integration
- **Google Gemini API** - AI model for question generation

## 📁 Project Structure

```
ai-exam-generator/
├── backend/
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
└── frontend/
    ├── public/
    │   └── index.html          # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── ExamGenerator.js    # Main exam generation form
    │   │   ├── ExamGenerator.css
    │   │   ├── ExamDisplay.js      # Generated exam display
    │   │   ├── ExamDisplay.css
    │   │   ├── LoadingSpinner.js   # Loading animation
    │   │   ├── LoadingSpinner.css
    │   │   ├── ErrorMessage.js     # Error handling component
    │   │   └── ErrorMessage.css77777777
    │   ├── App.js              # Main application component
    │   ├── App.css
    │   ├── index.js            # React entry point
    │   └── index.css           # Global styles
    └── package.json            # Frontend dependencies
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** (free from Google AI Studio)

### Installation

1. **Clone or create the project structure** as shown above

2. **Get your Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Click "Get API key"
   - Copy your API key

3. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=5000
   ```

4. **Setup Frontend**:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm run dev    # or npm start
   ```
   Server will run on http://localhost:5000

2. **Start the Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on http://localhost:3000

3. **Open your browser** and go to http://localhost:3000

## 🎯 Usage

1. **Select a Math Topic**: Choose from predefined topics or enter a custom one
2. **Choose Number of Questions**: Select between 1-20 questions
3. **Generate Exam**: Click the "Generate Math Exam" button
4. **View Results**: Review the generated exam questions
5. **Print or Download**: Use the action buttons to print directly or download as text

## 🔧 API Endpoints

### Backend Endpoints

- `GET /health` - Health check endpoint
- `POST /generate-exam` - Generate exam questions

#### POST /generate-exam
**Request Body:**
```json
{
  "topic": "Addition",
  "questionCount": 5
}
```

**Response:**
```json
{
  "topic": "Addition",
  "questionCount": 5,
  "questions": [
    {
      "id": 1,
      "question": "What is 5 + 3?"
    },
    // ... more questions
  ],
  "generatedAt": "2024-01-15T10:30:00.000Z"
}
```

## 🎨 Design Features

- **Modern Glass Morphism UI**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Eye-catching color schemes
- **Responsive Design**: Mobile-first approach
- **Print-Friendly Layout**: Professional exam format for printing
- **Loading Animations**: Engaging user feedback during processing
- **Icon Integration**: Font Awesome icons throughout

## 🔐 Security

- **API Key Protection**: Gemini API key stored securely on backend
- **Input Validation**: Frontend and backend validation
- **Error Handling**: Graceful error management
- **CORS Configuration**: Proper cross-origin setup

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🤝 Contributing

This project was created as a full-stack development assessment. Feel free to:
- Report bugs
- Suggest improvements
- Add new features
- Improve documentation

## 📄 License

This project is created for educational and assessment purposes.

## 🙏 Acknowledgments

- **Google AI Studio** for providing the Gemini API
- **React Team** for the amazing frontend framework
- **Express.js** for the lightweight backend framework
- **Font Awesome** for the beautiful icons

## 📞 Support

If you encounter any issues:
1. Check that your Gemini API key is correctly set
2. Ensure both frontend and backend servers are running
3. Verify your internet connection
4. Check the browser console for any errors

---

**Happy Teaching! 📚✨**"# exam-generator" 
