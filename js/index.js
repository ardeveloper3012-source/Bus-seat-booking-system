// Page-specific JavaScript - Trip toggle, search suggestions, date initialization

// Default departure date = today
document.addEventListener("DOMContentLoaded", () => {
  // Set default departure date (format: YYYY-MM-DD)
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const departureInput = document.getElementById("departure");
  if(departureInput) {
    departureInput.value = formattedDate;
  }

  // Trip Toggle - Segmented Control
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const arrivalInput = document.getElementById("arrival");
  const departureInputEl = document.getElementById("departure");
  
  if(toggleButtons.length > 0) {
    toggleButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        toggleButtons.forEach(b => b.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");
        
        const tripType = btn.dataset.trip;
        
        if (tripType === "roundtrip") {
          // Show arrival date for round trip
          if(arrivalInput) arrivalInput.style.display = "inline-block";
          if(departureInputEl) departureInputEl.placeholder = "Departure";
          if(arrivalInput) arrivalInput.placeholder = "Return";
        } else {
          // Hide arrival date for one way
          if(arrivalInput) arrivalInput.style.display = "none";
          if(departureInputEl) departureInputEl.placeholder = "Departure";
        }
      });
    });
  }

  // Search suggestions functionality
  setupSearchSuggestions("fromInput", "fromSuggestions", "from-options");
  setupSearchSuggestions("toInput", "toSuggestions", "to-options");
  
  // Handle search form submission - prevent default and redirect
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", handleIndexSearchSubmit);
  }
});

// Function to setup search suggestions
function setupSearchSuggestions(inputId, suggestionsId, radioName) {
  const input = document.getElementById(inputId);
  if(!input) return;
  
  const suggestionsDropdown = document.getElementById(suggestionsId);
  if(!suggestionsDropdown) return;
  
  const suggestionItems = suggestionsDropdown.querySelectorAll(".suggestion-item");
  const radios = suggestionsDropdown.querySelectorAll(`input[name="${radioName}"]`);

  // Show suggestions when input is focused
  input.addEventListener("focus", () => {
    suggestionsDropdown.classList.add("show");
  });

  // Filter suggestions based on input value
  input.addEventListener("input", (e) => {
    const filterValue = e.target.value.toLowerCase();
    suggestionItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(filterValue) ? "flex" : "none";
    });
    if (filterValue === "") {
      suggestionsDropdown.classList.add("show");
    }
  });

  // Handle radio button selection
  radios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      input.value = e.target.value;
      suggestionsDropdown.classList.remove("show");
    });
  });

  // Handle click on suggestion item
  suggestionItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const radio = item.querySelector("input[type='radio']");
      if (radio && !radio.checked) {
        radio.checked = true;
        input.value = radio.value;
        suggestionsDropdown.classList.remove("show");
      }
    });
  });

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
      suggestionsDropdown.classList.remove("show");
    }
  });
}

// Handle search form submission from index page
function handleIndexSearchSubmit(e) {
  e.preventDefault();
  
  const fromInput = document.getElementById("fromInput");
  const toInput = document.getElementById("toInput");
  const departureInput = document.getElementById("departure");
  
  // Get current values
  // Get arrival date and trip type for roundtrip support
  const arrivalInput = document.getElementById("arrival");
  const activeToggle = document.querySelector(".toggle-btn.active");
  const tripType = activeToggle ? activeToggle.dataset.trip : "oneway";
  const arrival = arrivalInput && arrivalInput.style.display !== "none" ? arrivalInput.value : "";
  
  const from = fromInput ? fromInput.value : '';
  const to = toInput ? toInput.value : '';
  const departure = departureInput ? departureInput.value : '';
  
  // Redirect to Buses page with search params
  if (from && to) {
    const params = new URLSearchParams();
    params.set('from', from);
    params.set('to', to);
    params.set('departure', departure);
    params.set('trip', tripType);
    if (arrival && tripType === "roundtrip") {
      params.set('arrival', arrival);
    }
    window.location.href = 'Buses.html?' + params.toString();
  }
}
