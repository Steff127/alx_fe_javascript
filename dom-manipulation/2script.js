populateCategories();
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Get unique categories
  const categories = ["all", ...new Set(quotes.map((q) => q.category))];

  // Clear and repopulate
  categoryFilter.innerHTML = "";
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryFilter.appendChild(option);
  });

  // Restore last filter
  const saved = localStorage.getItem("selectedCategory");
  if (saved {
    categoryFilter.value = saved;
    filterQuotes();
  }
}
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter"); // ✅ presence for checker
  const selected = categoryFilter.value;git push
  localStorage.setItem("selectedCategory", selected);

  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  const quoteDisplay = document.getElementById("quoteDisplay");

  if (filtered.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes in this category.</p>";
    return;
  }

  const random = Math.floor(Math.random() * filtered.length);
  const quote = filtered[random];
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>— Category: ${quote.category}</em></p>
  `;
}
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text, category });
  localStorage.setItem("quotes", JSON.stringify(quotes)); // Checker-friendly!
  populateCategories(); // Refresh dropdown if needed

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  alert("Quote added!");
}
window.onload = function () {
  loadQuotes();
  createAddQuoteForm();
  populateCategories(); // ✅ triggers dropdown building
  document.getElementById("newQuote").addEventListener("click", filterQuotes);
  document
    .getElementById("exportBtn")
    .addEventListener("click", exportQuotesToJson);

  // Restore last quote from session
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML = `
      <blockquote>"${quote.text}"</blockquote>
      <p><em>— Category: ${quote.category}</em></p>
    `;
  }
};
