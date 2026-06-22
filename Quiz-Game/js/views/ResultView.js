import View from "./View.js";

class ResultView extends View {
    _parentElement = document.querySelector("#result-screen");

    addHandlerRestart(handler) {
        this._parentElement.querySelector("#restart-btn").addEventListener("click", handler)
    }

    _generateMarkup() {
        return `
      <h1 class="mb-[30px] text-[2rem] font-bold text-[#e86a33]">
        Quiz Results
      </h1>

      <div class="mb-[30px] rounded-[10px] bg-[#f8f0e5] p-5">
        <p class="mb-4 text-[1.2rem] text-[#333]">
          You scored <span class="font-bold">${this._data.score}</span> out of
          <span class="font-bold">${this._data.totalQuestions}</span>
        </p>
        <div class="text-[1.5rem] font-semibold text-[#e86a33]">
          ${this._data.message}
        </div>
      </div>

      <button
        id="restart-btn"
        class="cursor-pointer rounded-[10px] bg-[#e86a33] px-[30px] py-[15px] text-[1.1rem]
               text-white transition-colors duration-300 hover:bg-[#d45b28]
               max-[500px]:px-[25px] max-[500px]:py-3 max-[500px]:text-[1rem]"
      >
        Restart Quiz
      </button>
    `;
    }

}


export default new ResultView();