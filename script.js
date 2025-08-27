// Dark mode toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
});

// Rotate Stoic Quotes
const quotes = [
  `"Amor Fati – Love your fate." – Nietzsche`,
  `"You have power over your mind, not outside events." – Marcus Aurelius`,
  `"We suffer more in imagination than in reality." – Seneca`,
  `"He who has a why to live can bear almost any how." – Nietzsche`
];

let index = 0;
const quoteEl = document.getElementById("stoic-quote");

setInterval(() => {
  index = (index + 1) % quotes.length;
  quoteEl.textContent = quotes[index];
}, 6000);
