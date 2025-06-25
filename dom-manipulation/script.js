const quotes = [
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    category: "Programming",
  },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");

// Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <blockquote>"${text}"</blockquote>
    <p><em>— Category: ${category}</em></p>
  `;
}

// Add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText").value.trim();
  const categoryInput = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (!textInput || !categoryInput) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text: textInput, category: categoryInput });
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  alert("Quote added!");
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
