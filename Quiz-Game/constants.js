// ─── Button Classes ─────────────────────────────────────────
export const ANSWER_BTN_CLASSES = [
  "w-full",
  "rounded-[10px]",
  "border-2",
  "border-[#eadbc8]",
  "bg-[#f8f0e5]",
  "p-4",
  "text-left",
  "text-[#333]",
  "transition-all",
  "duration-300",
  "hover:border-[#dac0ae]",
  "hover:bg-[#eadbc8]",
  "max-[500px]:p-3",
  "cursor-pointer",
  // Animation: start invisible and below
  "opacity-0",
  "translate-y-4",
];

export const CORRECT_CLASSES = [
  "bg-[#e6fff0]",
  "border-[#a3f0c4]",
  "text-[#28a745]",
];

export const INCORRECT_CLASSES = [
  "bg-[#fff0f0]",
  "border-[#ffbdbd]",
  "text-[#dc3545]",
];

export const REMOVE_ON_ANSWER = [
  "bg-[#f8f0e5]",
  "border-[#eadbc8]",
  "hover:bg-[#eadbc8]",
  "hover:border-[#dac0ae]",
  "cursor-pointer",
];

// ─── Animation Timing ───────────────────────────────────────
export const ANIMATION_CONFIG = {
  answerStaggerDelay: 100,   // ms between each answer appearing
  answerSlideDuration: 400,  // ms for each answer to slide in
  exitDuration: 300,         // ms for answers to slide out
  nextQuestionDelay: 1000,   // ms wait after answering before next
  screenFadeDuration: 300,   // ms for screen transitions
};

// ─── Result Messages ────────────────────────────────────────
export const RESULT_MESSAGES = [
  { min: 100, message: "Perfect! You're a genius! 🏆" },
  { min: 80, message: "Great job! You know your stuff! 🌟" },
  { min: 60, message: "Good effort! Keep learning! 👍" },
  { min: 40, message: "Not bad! Try again to improve! 💪" },
  { min: 0, message: "Keep studying! You'll get better! 📚" },
];