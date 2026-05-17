import {
    ANSWER_BTN_CLASSES,
    CORRECT_CLASSES,
    INCORRECT_CLASSES,
    REMOVE_ON_ANSWER
} from "./constants.js"


export default class Renderer {
    constructor() {
        this.container = document.querySelector(".relative"); // main container
        this.answersContainer = document.querySelector("#answers-container");
        this.questionText = document.querySelector("#question-text");
        this.currentQuestionSpan = document.querySelector("#current-question");
        this.totalQuestionsSpan = document.querySelector("#total-questions");
        this.scoreSpan = document.querySelector("#score");
        this.finalScoreSpan = document.querySelector("#final-score");
        this.maxScoreSpan = document.querySelector("#max-score");
        this.resultMessage = document.querySelector("#result-message");
        this.progressBar = document.querySelector("#progress");

        // Screen elements
        this.screens = {
            start: document.querySelector("#start-screen"),
            quiz: document.querySelector("#quiz-screen"),
            result: document.querySelector("#result-screen"),
        }
    }

    hideAllScreens() {
        // console.log(Object.values(this.screens));
        Object.values(this.screens).forEach(screen => {
            screen.classList.add("hidden");
            screen.classList.remove("opacity-100", "transition-opacity", "duration-300");
        })
    }

    getScreen(name) {
        return this.screens[name]
    }

    updateQuizInfo({ currentIndex, total, score }) {
        this.currentQuestionSpan.textContent = currentIndex + 1;
        this.totalQuestionsSpan.textContent = total;
        this.scoreSpan.textContent = score;
    }

    updateProgress(percent) {
        this.progressBar.style.width = `${percent}%`;
    }

    renderAnswers(answers) {
        this.answersContainer.innerHTML = "";

        const buttons = answers.map((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer.text;

            button.classList.add(...ANSWER_BTN_CLASSES);
            button.dataset.correct = answer.correct;
            button.dataset.index = index;

            this.answersContainer.appendChild(button);
            return button;
        })
    }

    markCorrect(button) {
        button.classList.remove(...REMOVE_ON_ANSWER);
        button.classList.add(...CORRECT_CLASSES);
    }

    markIncorrect(button) {
        button.classList.remove(...REMOVE_ON_ANSWER);
        button.classList.add(...INCORRECT_CLASSES);
    }

    disableAnswerHovers() {
        const buttons = Array.from(this.answersContainer.children);
        buttons.forEach((btn) => {
            btn.classList.remove(
                "hover:bg-[#eadbc8]",
                "hover:border-[#dac0ae]",
                "cursor-pointer"
            );
        });
    }

    getAnswerButtons() {
        return Array.from(this.answersContainer.children);
    }

    updateResults({ score, total, message }) {
        this.finalScoreSpan.textContent = score;
        this.maxScoreSpan.textContent = total;
        this.resultMessage.textContent = message;
    }

}




