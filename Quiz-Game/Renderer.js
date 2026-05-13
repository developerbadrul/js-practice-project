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
    }
}