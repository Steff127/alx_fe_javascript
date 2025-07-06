// Quote data structure
const quotes = [
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  {
    text: "The best way to get started is to quit talking and begin doing.",
    category: "Motivation",
  },
  { text: "If you’re not failing, you’re not learning.", category: "Growth" },
];

// Show a random quote from the array
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <blockquote>"${text}"</blockquote>
    <p><em>— Category: ${category}</em></p>
  `;
}

// Create and inject the Add Quote form using DOM manipulation
function createAddQuoteForm() {
  const formContainer = document.getElementById("quoteFormContainer");

  const quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(addButton);
}

// Handle new quote submission
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });

  // Clear inputs after submission
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}

// Attach events on load
window.onload = function () {
  createAddQuoteForm();
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
};
