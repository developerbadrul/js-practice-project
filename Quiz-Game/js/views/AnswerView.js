import View from "./View.js";

class AnswerView extends View {
    _parentElement = document.querySelector("#answers-container");

    addHandlerAnswer(handler) {
        this._parentElement.addEventListener("click", () => {
            const btn = e.target.closest("button");
            if (!btn) return;

            const index = Number(btn.dataset.index);
            handler(index, btn);
        })
    }

    _generateMarkup() {
        return this._data.map((answer, i) => `
             <button
          data-index="${i}"
          data-correct="${answer.correct}"
          class="w-full rounded-[10px] border-2 border-[#eadbc8] bg-[#f8f0e5] p-4
                 text-left text-[#333] transition-all duration-300
                 hover:border-[#dac0ae] hover:bg-[#eadbc8] max-[500px]:p-3
                 cursor-pointer opacity-0 translate-y-4"
        >
          ${answer.text}
        </button>
        `).join("");
    }

    async animateIn() {
        await this._animateStaggerIn("button");
    }

    async animateOut() {
        await this._animateStaggerOut("button");
    }

    showResults(selectedButton) {
        const buttons = Array.from(this._parentElement.querySelectorAll("button"));

        const removeClasses = [
            "bg-[#f8f0e5]",
            "border-[#eadbc8]",
            "hover:bg-[#eadbc8]",
            "hover:border-[#dac0ae]",
            "cursor-pointer",
        ];

        const correctClasses = [
            "bg-[#e6fff0]",
            "border-[#a3f0c4]",
            "text-[#28a745]",
        ];

        const incorrectClasses = [
            "bg-[#fff0f0]",
            "border-[#ffbdbd]",
            "text-[#dc3545]",
        ];

        buttons.forEach(btn => {
            btn.classList.remove(...removeClasses);
            if (btn.dataset.correct === "true") {
                btn.classList.add(...correctClasses);
            } else if (btn === selectedButton) {
                btn.classList.add(...incorrectClasses);
            }
        })
    }
}

export default new AnswerView();