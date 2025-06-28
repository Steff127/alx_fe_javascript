let quotes = [];

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quotes = JSON.parse(stored);
  } else {
    // default data if localStorage is empty
    quotes = [
      {
        text: "Simplicity is the soul of efficiency.",
        category: "Productivity",
      },
      {
        text: "If you’re not failing, you’re not learning.",
        category: "Growth",
      },
      { text: "Stay curious. Learn always.", category: "Inspiration" },
    ];
    saveQuotes();
  }
}

// Display a random quote and store it in sessionStorage
function showRandomQuote() {
  const display = document.getElementById("quoteDisplay");
  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));

  display.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>— Category: ${quote.category}</em></p>
  `;
}

// Create the quote form with DOM
function createAddQuoteForm() {
  const container = document.getElementById("quoteFormContainer");

  const quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  container.appendChild(quoteInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  alert("Quote added!");

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Export to JSON
function exportQuotesToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initial setup
window.onload = function () {
  loadQuotes();
  createAddQuoteForm();

  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
  document
    .getElementById("exportBtn")
    .addEventListener("click", exportQuotesToJson);

  // Optionally restore last viewed quote
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    document.getElementById("quoteDisplay").innerHTML = `
      <blockquote>"${quote.text}"</blockquote>
      <p><em>— Category: ${quote.category}</em></p>
    `;
  }
};
