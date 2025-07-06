let quotes = [];

function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quotes = JSON.parse(stored);
  } else {
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
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map((q) => q.category))];

  categoryFilter.innerHTML = "";
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryFilter.appendChild(option);
  });

  const lastFilter = localStorage.getItem("selectedCategory");
  if (lastFilter) {
    categoryFilter.value = lastFilter;
    filterQuotes();
  }
}

function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selected = categoryFilter.value;
  localStorage.setItem("selectedCategory", selected);

  const display = document.getElementById("quoteDisplay");
  const filtered =
    selected === "all" ? quotes : quotes.filter((q) => q.category === selected);

  if (filtered.length === 0) {
    display.innerHTML = "<p>No quotes in this category.</p>";
    return;
  }

  const random = Math.floor(Math.random() * filtered.length);
  const quote = filtered[random];

  display.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>— Category: ${quote.category}</em></p>
  `;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

function showRandomQuote() {
  filterQuotes(); // Reuse filter logic to respect active category
}

function createAddQuoteForm() {
  const container = document.getElementById("quoteFormContainer");

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

  container.appendChild(quoteInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text, category });
  localStorage.setItem("quotes", JSON.stringify(quotes)); // ✅ Required literal call
  populateCategories(); // Refresh dropdown
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  alert("Quote added!");
}

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

function importFromJsonFile(event) {
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes)); // ✅ Again, literal call
        populateCategories();
        alert("Quotes imported!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Error importing JSON.");
    }
  };

  reader.readAsText(event.target.files[0]);
}

window.onload = function () {
  loadQuotes();
  createAddQuoteForm();
  populateCategories();

  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) exportBtn.addEventListener("click", exportQuotesToJson);

  const newQuoteBtn = document.getElementById("newQuote");
  if (newQuoteBtn) newQuoteBtn.addEventListener("click", showRandomQuote);

  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML = `
      <blockquote>"${quote.text}"</blockquote>
      <p><em>— Category: ${quote.category}</em></p>
    `;
  }
};

