// Vanilla JS Seat Selection - Clean Standalone Version
// Features: 2+2 seat map, gender preference with adjacent conflicts, URL params, fare calc, modal

// State
let seats = [];
let selectedSeats = [];
let selectedGender = 'male';
let seatSelectionMode = 'multiple';
let totalFare = 0;
let busParams = {};

// Constants
const SEAT_PRICE_DEFAULT = 1500;
const BUS_LAYOUT = { seatsPerRow: 4, totalRows: 10 };

// Init app
function initApp() {
  generateSeats();
  parseURLParams();
  renderSeats();
  bindEvents();
  updateSummary();
}

// Generate seats with 30% booked (15% male, 15% female)
function generateSeats() {
  seats = [];
  for (let row = 1; row <= BUS_LAYOUT.totalRows; row++) {
    for (let col = 1; col <= BUS_LAYOUT.seatsPerRow; col++) {
      const seatNumber = (row - 1) * BUS_LAYOUT.seatsPerRow + col;
      const rand = Math.random();
      let status = 'available';
      if (rand < 0.15) status = 'male';
      else if (rand < 0.30) status = 'female';
      
      seats.push({ id: `L${seatNumber}`, number: seatNumber, row, col, status });
    }
  }
}

// Parse URL params for route/bus info
function parseURLParams() {
  const params = new URLSearchParams(window.location.search);
  console.log('Selection params:', Object.fromEntries(params));
  
  const hasValidParams = params.get('from') && params.get('to') && params.get('bus');
  if (!hasValidParams) {
    document.body.classList.add('no-bus-selected');
    document.querySelector('.confirm-btn').disabled = true;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'no-bus-message';
    messageDiv.innerHTML = `
      <h3 style="color: #666; margin-bottom: 1rem;">No Bus Selected</h3>
      <p style="color: #888; margin-bottom: 1.5rem;">Please select a route and bus first to view seat layout.</p>
      <a href="Buses.html" class="back-btn">← Go to Buses</a>
    `;
    const busLayout = document.querySelector('.bus-layout');
    busLayout.innerHTML = '';
    busLayout.appendChild(messageDiv);
    return;
  }
  
  document.body.classList.remove('no-bus-selected');
  busParams = {
    from: decodeURIComponent(params.get('from') || ''),
    to: decodeURIComponent(params.get('to') || ''),
    bus: decodeURIComponent(params.get('bus') || ''),
    time: decodeURIComponent(params.get('time') || ''),
    date: decodeURIComponent(params.get('date') || ''),
    price: parseInt(params.get('price')) || SEAT_PRICE_DEFAULT
  };
  console.log('Parsed busParams:', busParams);
  updateRouteDisplay();
}

function updateRouteDisplay() {
  // Map DOM classes to busParams keys with direct ID selectors
  const mappings = [
    { selector: '.route-from', key: 'from' },
    { selector: '.route-to', key: 'to' },
    { selector: '#route-from', key: 'from' },
    { selector: '#route-to', key: 'to' },
    { selector: '.bus-name', key: 'bus' },
    { selector: '#bus-name', key: 'bus' },
    { selector: '.bus-time', key: 'time' },
    { selector: '#bus-time', key: 'time' },
    { selector: '.bus-date', key: 'date' },
    { selector: '#bus-date', key: 'date' }
  ];
  
  mappings.forEach(({ selector, key }) => {
    const el = document.querySelector(selector);
    if (el && busParams[key]) {
      el.textContent = busParams[key];
      el.style.opacity = '1';
    }
  });
  console.log('Route display updated');
}

// Check adjacent opposite gender (privacy rule)
function isAdjacentToOppositeGender(seat) {
  const opposite = selectedGender === 'male' ? 'female' : 'male';
  const rowSeats = seats.filter(s => s.row === seat.row);
  const adjacentIds = seat.col <= 2 ? rowSeats.slice(0,2).map(s => s.id) : rowSeats.slice(2).map(s => s.id);
  return adjacentIds.some(id => {
    const adj = seats.find(s => s.id === id);
    if (!adj) return false;
    let adjGender;
    if (adj.status === 'selected') {
      const selectedAdj = selectedSeats.find(ss => ss.id === id);
      adjGender = selectedAdj ? selectedAdj.gender : selectedGender;
    } else {
      adjGender = adj.status;
    }
    return adjGender === opposite && adj.status !== 'selected' && id !== seat.id;
  });
}

// Handle seat click
window.handleSeatSelect = function(seatId) {
  const seat = seats.find(s => s.id === seatId);
  if (!seat) return;

  if (seat.status === selectedGender || isAdjacentToOppositeGender(seat)) {
    showSeatConflictModal();
    return;
  }

  const index = selectedSeats.findIndex(s => s.id === seatId);
  if (index > -1) {
    selectedSeats.splice(index, 1);
    seat.status = 'available';
  } else {
    if (seatSelectionMode === 'single') {
      selectedSeats.forEach(selected => {
        const otherSeat = seats.find(s => s.id === selected.id);
        if (otherSeat) otherSeat.status = 'available';
      });
      selectedSeats = [];
    }
    seat.status = 'selected';
    selectedSeats.push({...seat, gender: selectedGender});
  }
  renderSeats();
  updateSummary();
};

// Render seat map
function renderSeats() {
  const container = document.querySelector('.seat-rows');
  if (!container) return;

  let html = '';
  for (let row = 1; row <= BUS_LAYOUT.totalRows; row++) {
    const rowSeats = seats.filter(s => s.row === row);
    html += `<div class="seat-row">
      <span class="row-label">${row}</span>
      <div class="seats-left">`;
    rowSeats.slice(0,2).forEach(seat => html += seatHTML(seat));
    html += `</div><div class="aisle"></div><div class="seats-right">`;
    rowSeats.slice(2).forEach(seat => html += seatHTML(seat));
    html += '</div></div>';
  }
  container.innerHTML = html;
}

function seatHTML(seat) {
  let classes = '';
  if (seat.status === 'selected') {
    const selectedSeat = selectedSeats.find(s => s.id === seat.id);
    const seatGender = selectedSeat ? selectedSeat.gender : selectedGender;
    classes = seatGender === 'male' ? 'selected-male' : 'selected-female';
  } else if (seat.status === 'male') {
    classes = 'male-booked';
  } else if (seat.status === 'female') {
    classes = 'female-booked';
  } else {
    classes = 'available';
  }
  return `<div class="seat ${classes}" onclick="handleSeatSelect('${seat.id}')">${seat.number}</div>`;
}

// Update UI
function updateSummary() {
  totalFare = selectedSeats.reduce((sum, s) => sum + busParams.price, 0);
  document.querySelector('.selected-count').textContent = selectedSeats.length;
  document.querySelector('.seats-suffix').textContent = selectedSeats.length === 1 ? 'seat' : 'seats';
  document.querySelector('.ticket-fare').textContent = totalFare.toLocaleString();
  document.querySelector('.total-fare').textContent = totalFare.toLocaleString();
  document.querySelector('.confirm-btn').disabled = selectedSeats.length === 0;
}

// Events
function bindEvents() {
  document.querySelectorAll('[data-mode]').forEach(btn => 
    btn.onclick = () => {
      document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      seatSelectionMode = btn.dataset.mode;
      selectedSeats = [];
      seats.forEach(s => s.status === 'selected' ? s.status = 'available' : null);
      renderSeats();
      updateSummary();
    }
  );

  document.querySelectorAll('[data-gender]').forEach(btn => 
    btn.onclick = () => {
      document.querySelectorAll('[data-gender]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedGender = btn.dataset.gender;
      updateSummary();
    }
  );

  document.querySelector('.confirm-btn').onclick = () => {
    if (selectedSeats.length) {
      const seatsStr = selectedSeats.map(s => s.number).join(',');
      const params = new URLSearchParams({
        from: busParams.from,
        to: busParams.to,
        bus: busParams.bus,
        time: busParams.time,
        date: busParams.date,
        price: busParams.price,
        seats: seatsStr,
        total: totalFare,
        gender: selectedGender
      });
      window.location.href = 'Userinfo.html?' + params.toString();
    }
  };

  // Modal controls - robust close
  const overlay = document.querySelector('.seat-conflict-overlay');
  const closeBtn = document.querySelector('.seat-conflict-close');
  
  overlay.onclick = (e) => {
    if (e.target === overlay) hideSeatConflictModal();
  };
  
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      hideSeatConflictModal();
    };
  }

}

function showSeatConflictModal() { 
  const overlay = document.querySelector('.seat-conflict-overlay');
  if (overlay) overlay.classList.add('show'); 
}
function hideSeatConflictModal() { 
  const overlay = document.querySelector('.seat-conflict-overlay');
  if (overlay) overlay.classList.remove('show'); 
}

// Auto init
document.addEventListener('DOMContentLoaded', initApp);

