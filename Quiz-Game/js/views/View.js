export default class View {
    _data;
    _parentElement;
    _animationConfig = {
        staggerDelay: 100,
        slideDuration: 400,
        exitDuration: 300,
        screenFadeDuration: 300,
    };

    render(data, render = true) {
        if (!data || (Array.isArray(data)) && data.length === 0) {
            return this.renderError();
        }

        this._data = data;
        const markUp = this._generateMarkup();
        if (!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }

    update(data) {
        this._data = data;
        const newMarkUp = this._generateMarkup();
        const newDOM = document.createRange().createContextualFragment(newMarkUp);
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElement = Array.from(this._parentElement.querySelectorAll("*"));

        // update text if any
        newElements.forEach((newEl, i) => {
            const curEl = curElement[i];
            if (!curEl) return;

            if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
                curEl.textContent = newEl.textContent
            }

            // Update changed ATTRIBUTES (class, style, data-*, etc.)
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => {
                    curEl.setAttribute(attr.name, attr.value)
                })
            }
        });



    }

    _clear() {
        this._parentElement.innerHTML = "";
    }

    _generateMarkup() {
        throw new Error("Child class must implement _generateMarkup()");
    }

    _animateStaggerIn(selector) {
        const elements = this._parentElement.querySelectorAll(selector);
        const { staggerDelay, slideDuration } = this._animationConfig;

        return new Promise(resolve => {
            elements.forEach((el, i) => {
                setTimeout(() => {
                    el.classList.remove("opacity-0", "translate-y-4");
                    el.classList.add("opacity-100", "translate-y-0");
                }, i * staggerDelay)
            });

            const totaltime = (elements.length - 1) * staggerDelay + slideDuration;
            setTimeout(resolve, totaltime)
        });
    }

    _animateStaggerOut(selector) {
        const elements = this._parentElement.querySelectorAll(selector);
        const { staggerDelay, exitDuration } = this._animationConfig;
        const halfDelay = staggerDelay / 2;

        return new Promise(resolve => {
            elements.forEach((el, i) => {
                setTimeout(() => {
                    el.classList.remove("opacity-100", "translate-y-0");
                    el.classList.add("opacity-0", "-translate-y-4");
                }, i * halfDelay);
            });

            const totalTime = (elements.length - 1) * halfDelay + exitDuration;
            setTimeout(resolve, totalTime);
        });
    }

    fadeIn() {
        const { screenFadeDuration } = this._animationConfig;

        return new Promise(resolve => {
            this._parentElement.classList.remove("hidden");
            this._parentElement.classList.add(
                "opacity-0",
                "transition-opacity",
                "duration-300"
            );
        })

        requestAnimationFrame(() => {
            this._parentElement.classList.remove("opacity-0");
            this._parentElement.classList.add("opacity-100");
        })

        setTimeout(resolve, screenFadeDuration);
    }


    fadeOut() {
        const { screenFadeDuration } = this._animationConfig;

        return new Promise((resolve) => {
            this._parentElement.classList.remove("opacity-100");
            this._parentElement.classList.add("opacity-0");

            setTimeout(() => {
                this._parentElement.classList.add("hidden");
                this._parentElement.classList.remove(
                    "transition-opacity",
                    "duration-300",
                    "opacity-0"
                );
                resolve();
            }, screenFadeDuration);
        });
    }

    _animateTextSwap(element, newText) {
        return new Promise(resolve => {
            element.classList.add("transition-opacity", "duration-200", "opacity-0");
            setTimeout(() => {
                element.textContent = newText;
                element.classList.remove("opacity-0");
                element.classList.add("opacity-100");

                setTimeout(() => {
                    element.classList.remove(
                        "transition-opacity",
                        "duration-200",
                        "opacity-100"
                    );
                    resolve();
                }, 200)
            }, 200)
        })
    }

    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}