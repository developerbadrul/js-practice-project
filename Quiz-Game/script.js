// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.querySelector("#answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const answerButtonClasses =
    "w-full rounded-[10px] border-2 border-[#eadbc8] bg-[#f8f0e5] p-4 text-left text-[#333] transition-all duration-300 hover:border-[#dac0ae] hover:bg-[#eadbc8] max-[500px]:p-3 cursor-pointer";

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Banana", correct: true },
            { text: "JavaScript", correct: false },
        ],
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
        ],
    },
];


// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;


totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    document.getElementById(screenId).classList.remove("hidden");
}

function startQuiz() {
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    showScreen("quiz-screen");
    showQuestion()
}

function showQuestion() {
    //reset state
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    //todo: progress will be here 
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.className = answerButtonClasses;
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button)
    })

}

function selectAnswer(event) {
    if (answersDisabled) return;

    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(btn => {
        btn.classList.remove("bg-[#f8f0e5]", "border-[#eadbc8]");
        if (btn.dataset.correct === "true") {
            btn.classList.add("bg-[#e6fff0]", "border-[#a3f0c4]", "text-[#28a745]")
        } else if (btn === selectedButton) {
            btn.classList.add("bg-[#fff0f0]", "border-[#ffbdbd]", "text-[#dc3545]");
        }
        btn.classList.remove("hover:bg-[#eadbc8]", "hover:border-[#dac0ae]", "cursor-pointer");
    })


    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000)
}

function showResults() {
    showScreen("result-screen");
    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }

}



function restartQuiz() {
    startQuiz();
}