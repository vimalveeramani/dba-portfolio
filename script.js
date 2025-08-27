// Theme Toggle
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

// Stoic Quotes Rotator
const quotes = [
  `"Waste no more time arguing what a good man should be. Be one." – Marcus Aurelius`,
  `"We suffer more in imagination than in reality." – Seneca`,
  `"The happiness of your life depends upon the quality of your thoughts." – Marcus Aurelius`,
  `"He who has a why to live can bear almost any how." – Nietzsche`
];
let index = 0;
setInterval(() => {
  index = (index + 1) % quotes.length;
  document.getElementById("stoic-quote").textContent = quotes[index];
}, 6000);
