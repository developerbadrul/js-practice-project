import View from "./View.js";


class StartView extends View {
    _parentElement = document.querySelector("#start-screen");

    addHandlerStart(handler) {
        this._parentElement.querySelector("#start-btn").addEventListener("click", handler)
    }

    _generateMarkup() {
        return `
      <h1 class="mb-5 text-[2.5rem] font-bold text-[#e86a33] max-[500px]:text-[2rem]">
        Quiz Time!
      </h1>
      <p class="mb-[30px] text-[1.1rem] text-[#666]">
        Test your knowledge with these fun questions
      </p>
      <button
        id="start-btn"
        class="cursor-pointer rounded-[10px] bg-[#e86a33] px-[30px] py-[15px] text-[1.1rem] text-white transition-colors duration-300 hover:bg-[#d45b28] max-[500px]:px-[25px] max-[500px]:py-3 max-[500px]:text-[1rem]"
      >
        Start Quiz
      </button>
    `;
    }
}

export default new StartView();