const questions = [
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


export const state = {
    currentIndex: 0,
    score: 0,
    isAnswered: false,
    isAnimating: false,
    totalQuestions: questions.length,
}

const RESULT_MESSAGES = [
    { min: 100, message: "Perfect! You're a genius! 🏆" },
    { min: 80, message: "Great job! You know your stuff! 🌟" },
    { min: 60, message: "Good effort! Keep learning! 👍" },
    { min: 40, message: "Not bad! Try again to improve! 💪" },
    { min: 0, message: "Keep studying! You'll get better! 📚" },
];


export const resetQuiz = () => {
    state.currentIndex = 0;
    state.score = 0;
    state.isAnswered = false;
    state.isAnimating = false;
}

export const getCurrentQuestion = () => {
    return questions[state.currentIndex]
}

export const submitAnswer = (answerIndex) => {
    const question = getCurrentQuestion();
    const isCorrect = question.answers[answerIndex].correct;

    if (isCorrect) state.score++;
    state.isAnswered = true;
    return isCorrect;
}

export const nextQuestion = () => {
    state.currentIndex++;
    state.isAnswered = false;
    return state.currentIndex < state.totalQuestions
}

export const getProgress = () => {
    return (state.currentIndex / state.totalQuestions) * 100;
}

export const getResultMessage = () => {
    const percentage = (state.score / state.totalQuestions) * 100;
    return RESULT_MESSAGES.find(r => percentage >= r.min).message;
}