import View from "./View.js";

class QuizView extends View {
    _parentElement = document.querySelector("#quiz-screen");

    _generateMarkup() {
        return `
      <div class="mb-4">
        <h2
          id="question-text"
          class="mb-4 text-[1.5rem] leading-[1.4] font-bold text-[#333] max-[500px]:text-[1.3rem]"
        >
          ${this._data.question}
        </h2>

        <div class="mb-[10px] flex justify-between text-[#666]">
          <p>
            Question <span data-info="current">${this._data.currentIndex + 1}</span> of
            <span data-info="total">${this._data.totalQuestions}</span>
          </p>
          <p>Score: <span data-info="score">${this._data.score}</span></p>
        </div>
      </div>

      <div id="answers-container" class="mb-[25px] flex flex-col gap-[10px]"></div>

      <div class="mt-5 h-[10px] overflow-hidden rounded-[5px] bg-[#f8f0e5]">
        <div
          data-progress
          class="h-full bg-[#e86a33] transition-[width] duration-300 ease-in-out"
          style="width: ${this._data.progress}%"
        ></div>
      </div>
    `;
    }

    getQuestionTextElement() {
        return this._parentElement.querySelector("#question-text");
    }

    async animateQuestionChange(newText) {
        const questionEl = this.getQuestionTextElement();
        await this._animateTextSwap(questionEl, newText)
    }

    updateProgress(percent) {
        const bar = this._parentElement.querySelector("[data-progress]");
        if (bar) bar.style.width = `${percent}%`;
    }

    updateInfo(data) {
        this.update(data);
    }
}

export default new QuizView();
