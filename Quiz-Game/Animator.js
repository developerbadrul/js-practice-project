
import { ANIMATION_CONFIG } from "./constants.js";

export default class Animator {
  /**
   * Slide in elements one by one (stagger effect)
   *
   * @param {HTMLElement[]} elements - Array of DOM elements to animate
   * @returns {Promise} - Resolves when ALL animations are complete
   *
   * WHY return a Promise?
   * - So we can use "await" and do something AFTER animation finishes
   * - Example: await animator.staggerIn(buttons);  // wait for animation
   *            enableClicking();                     // THEN enable clicks
   */
  staggerIn(elements) {
    const { answerStaggerDelay, answerSlideDuration } = ANIMATION_CONFIG;

    return new Promise((resolve) => {
      elements.forEach((element, index) => {
        // Each element starts slightly later than the previous one
        const delay = index * answerStaggerDelay;

        setTimeout(() => {
          // Remove "hidden" state, add "visible" state
          // Tailwind's transition-all handles the smooth animation
          element.classList.remove("opacity-0", "translate-y-4");
          element.classList.add("opacity-100", "translate-y-0");
        }, delay);
      });

      // Total time = last element's delay + its animation duration
      const totalTime =
        (elements.length - 1) * answerStaggerDelay + answerSlideDuration;
      setTimeout(resolve, totalTime);
    });
  }

  /**
   * Slide out elements one by one (reverse stagger)
   *
   * @param {HTMLElement[]} elements - Array of DOM elements to animate out
   * @returns {Promise} - Resolves when ALL elements have animated out
   */
  staggerOut(elements) {
    const { answerStaggerDelay, exitDuration } = ANIMATION_CONFIG;

    return new Promise((resolve) => {
      elements.forEach((element, index) => {
        const delay = index * (answerStaggerDelay / 2); // Exit faster

        setTimeout(() => {
          element.classList.remove("opacity-100", "translate-y-0");
          element.classList.add("opacity-0", "-translate-y-4"); // Slide UP and fade
        }, delay);
      });

      const totalTime =
        (elements.length - 1) * (answerStaggerDelay / 2) + exitDuration;
      setTimeout(resolve, totalTime);
    });
  }

  /**
   * Fade a screen in
   *
   * @param {HTMLElement} screen - The screen element to fade in
   * @returns {Promise}
   */
  fadeIn(screen) {
    const { screenFadeDuration } = ANIMATION_CONFIG;

    return new Promise((resolve) => {
      // First make it visible but transparent
      screen.classList.remove("hidden");
      screen.classList.add("opacity-0", "transition-opacity", "duration-300");

      // Force browser to process the above changes before animating
      // This is called "forcing a reflow"
      // Without this, the browser batches both changes and you see no animation
      requestAnimationFrame(() => {
        screen.classList.remove("opacity-0");
        screen.classList.add("opacity-100");
      });

      setTimeout(resolve, screenFadeDuration);
    });
  }

  /**
   * Fade a screen out
   *
   * @param {HTMLElement} screen - The screen element to fade out
   * @returns {Promise}
   */
  fadeOut(screen) {
    const { screenFadeDuration } = ANIMATION_CONFIG;

    return new Promise((resolve) => {
      screen.classList.remove("opacity-100");
      screen.classList.add("opacity-0");

      setTimeout(() => {
        screen.classList.add("hidden");
        // Clean up transition classes
        screen.classList.remove("transition-opacity", "duration-300", "opacity-0");
        resolve();
      }, screenFadeDuration);
    });
  }

  /**
   * Animate question text change
   * Fades out old text, swaps it, fades in new text
   *
   * @param {HTMLElement} element - The question text element
   * @param {string} newText - The new question string
   * @returns {Promise}
   */
  swapText(element, newText) {
    return new Promise((resolve) => {
      // Fade out
      element.classList.add("transition-opacity", "duration-200");
      element.classList.add("opacity-0");

      setTimeout(() => {
        // Swap text while invisible
        element.textContent = newText;
        // Fade in
        element.classList.remove("opacity-0");
        element.classList.add("opacity-100");

        setTimeout(() => {
          element.classList.remove("transition-opacity", "duration-200", "opacity-100");
          resolve();
        }, 200);
      }, 200);
    });
  }
}