// Common JavaScript - Header scroll functionality and modals

// Change header color on scroll
window.addEventListener("scroll", function() {
  let header = document.getElementById("mainHeader");
  if(header) {
    if(window.scrollY > 50) {
      header.classList.remove("transparent");
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
      header.classList.add("transparent");
    }
  }
});

// Modal Functionality
console.log("script.js DOMContentLoaded fired");
document.addEventListener("DOMContentLoaded", function() {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const adminBtn = document.getElementById("adminBtn");
  
  // Modal elements
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");
  const adminModal = document.getElementById("adminModal");
  
  // Button click handlers to open modals
  if (loginBtn) {
    console.log("Login button handler attached");
    loginBtn.addEventListener("click", function(e) {
      console.log("Login button clicked");
      e.preventDefault();
      openModal("loginModal");
    });
  }
  
  if (signupBtn) {
    console.log("Signup button handler attached");
    signupBtn.addEventListener("click", function(e) {
      console.log("Signup button clicked");
      e.preventDefault();
      openModal("signupModal");
    });
  }
  
  if (adminBtn) {
    console.log("Admin button handler attached");
    adminBtn.addEventListener("click", function(e) {
      console.log("Admin button clicked");
      e.preventDefault();
      openModal("adminModal");
    });
  }
  
  // Close modal when clicking outside
  if (loginModal) {
    loginModal.addEventListener("click", function(e) {
      if (e.target === loginModal) {
        closeModal("loginModal");
      }
    });
  }
  
  if (signupModal) {
    signupModal.addEventListener("click", function(e) {
      if (e.target === signupModal) {
        closeModal("signupModal");
      }
    });
  }
  
  if (adminModal) {
    adminModal.addEventListener("click", function(e) {
      if (e.target === adminModal) {
        closeModal("adminModal");
      }
    });
  }
  
  // Close modals on Escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      closeModal("loginModal");
      closeModal("signupModal");
      closeModal("adminModal");
    }
  });
  
  // Login Form Submission
  const loginFormModal = document.getElementById("loginFormModal");
  if (loginFormModal) {
    loginFormModal.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const email = document.getElementById("loginEmailModal").value.trim();
      const password = document.getElementById("loginPasswordModal").value;
      const rememberMe = document.getElementById("rememberMe").checked;
      
      // Clear previous messages
      hideMessage("loginError");
      hideMessage("loginSuccess");
      
      // Validate
      if (!validateEmail(email)) {
        showMessage("loginError", "Please enter a valid email address");
        return;
      }
      
      if (password.length < 1) {
        showMessage("loginError", "Please enter your password");
        return;
      }
      
      // Check stored users in localStorage
      const users = JSON.parse(localStorage.getItem("movenco_users") || "[]");
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Login successful
        showMessage("loginSuccess", "Login successful! Redirecting...");
        
        // Store session
        const sessionData = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem("movenco_session", JSON.stringify(sessionData));
        
        // Update UI
        setTimeout(() => {
          closeModal("loginModal");
          updateUIForLoggedIn(user.name);
          loginFormModal.reset();
          hideMessage("loginSuccess");
        }, 1500);
      } else {
        showMessage("loginError", "Invalid email or password. Please sign up first.");
      }
    });
  }
  
  // Signup Form Submission
  const signupFormModal = document.getElementById("signupFormModal");
  if (signupFormModal) {
    signupFormModal.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const name = document.getElementById("signupNameModal").value.trim();
      const email = document.getElementById("signupEmailModal").value.trim();
      const phone = document.getElementById("signupPhoneModal").value.trim();
      const password = document.getElementById("signupPasswordModal").value;
      
      // Clear previous messages
      hideMessage("signupError");
      hideMessage("signupSuccess");
      
      // Validate name
      if (name.length < 2) {
        showMessage("signupError", "Please enter your full name");
        return;
      }
      
      // Validate email
      if (!validateEmail(email)) {
        showMessage("signupError", "Please enter a valid email address");
        return;
      }
      
      // Validate phone
      if (phone.length < 10) {
        showMessage("signupError", "Please enter a valid phone number");
        return;
      }
      
      // Validate password
      if (password.length < 6) {
        showMessage("signupError", "Password must be at least 6 characters");
        return;
      }
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("movenco_users") || "[]");
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        showMessage("signupError", "An account with this email already exists");
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        password: password,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem("movenco_users", JSON.stringify(users));
      
      // Show success
      showMessage("signupSuccess", "Account created successfully! You can now login.");
      
      // Auto login after signup
      setTimeout(() => {
        closeModal("signupModal");
        openModal("loginModal");
        signupFormModal.reset();
        hideMessage("signupSuccess");
      }, 2000);
    });
  }
  
  // Admin Form Submission
  const adminFormModal = document.getElementById("adminFormModal");
  if (adminFormModal) {
    adminFormModal.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const username = document.getElementById("adminUsernameModal").value.trim();
      const passkey = document.getElementById("adminPasskeyModal").value;
      
      // Clear previous messages
      hideMessage("adminError");
      hideMessage("adminSuccess");
      
      // Validate
      if (username.length < 1) {
        showMessage("adminError", "Please enter your username");
        return;
      }
      
      if (passkey.length < 1) {
        showMessage("adminError", "Please enter your passkey");
        return;
      }
      
      // Admin credentials (hardcoded for demo)
      const adminCredentials = {
        username: "admin",
        passkey: "admin123"
      };
      
      if (username === adminCredentials.username && passkey === adminCredentials.passkey) {
        // Admin login successful
        showMessage("adminSuccess", "Admin login successful! Redirecting...");
        
        // Store admin session
        const adminSession = {
          username: username,
          role: "admin",
          loginTime: new Date().toISOString()
        };
        localStorage.setItem("movenco_admin_session", JSON.stringify(adminSession));
        
        // Redirect to admin page
        setTimeout(() => {
          closeModal("adminModal");
          adminFormModal.reset();
          hideMessage("adminSuccess");
          // Could redirect to admin dashboard here
          alert("Welcome to Admin Dashboard!");
        }, 1500);
      } else {
        showMessage("adminError", "Invalid username or passkey");
      }
    });
  }
  
  // Check for existing session on page load
  checkExistingSession();
});

// Helper Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  // If no modalId provided, close bus details modal if it exists (for compatibility)
  if (!modalId) {
    const busModal = document.getElementById('busDetailsModal');
    if (busModal) {
      busModal.classList.remove('active');
    }
    document.body.style.overflow = '';
    return;
  }
  
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    
    // Clear form and messages when closing
    const form = modal.querySelector("form");
    if (form) {
      form.reset();
    }
    
    // Hide all messages in this modal
    const errorEl = modal.querySelector(".modal-error");
    const successEl = modal.querySelector(".modal-success");
    if (errorEl) errorEl.classList.remove("show");
    if (successEl) successEl.classList.remove("show");
  }
  
  // Restore page scroll position when closing modal
  window.scrollTo(0, 0);
}

function switchModal(fromModalId, toModalId) {
  closeModal(fromModalId);
  setTimeout(() => {
    openModal(toModalId);
  }, 200);
}

function showMessage(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = message;
    el.classList.add("show");
  }
}

function hideMessage(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.classList.remove("show");
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }
}

function handleGoogleLogin() {
  // Google Sign-In would be implemented here
  // This requires a client ID from Google Cloud Console
  alert("Google Sign-In requires configuration. Please set up Google Cloud OAuth credentials.");
}

function handleFacebookLogin() {
  // Facebook Sign-In would be implemented here
  // This requires Facebook Developer App configuration
  alert("Facebook Sign-In requires configuration. Please set up Facebook OAuth credentials.");
}

function checkExistingSession() {
  const session = localStorage.getItem("movenco_session");
  if (session) {
    const sessionData = JSON.parse(session);
    updateUIForLoggedIn(sessionData.name);
  }
}

function updateUIForLoggedIn(userName) {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  
  if (loginBtn) {
    loginBtn.textContent = userName;
    loginBtn.title = "Click to logout";
    
    // Add click handler for logout
    loginBtn.onclick = function() {
      logout();
    };
  }
  
  if (signupBtn) {
    signupBtn.textContent = "Logout";
    signupBtn.onclick = function() {
      logout();
    };
  }
}

function logout() {
  localStorage.removeItem("movenco_session");
  localStorage.removeItem("movenco_admin_session");
  
  // Reset button text and functionality
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  
  if (loginBtn) {
    loginBtn.textContent = "Login";
    loginBtn.onclick = function() {
      openModal("loginModal");
    };
  }
  
  if (signupBtn) {
    signupBtn.textContent = "Signup";
    signupBtn.onclick = function() {
      openModal("signupModal");
    };
  }
  
  alert("You have been logged out successfully!");
}

// Global functions for inline onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.switchModal = switchModal;
window.togglePassword = togglePassword;
window.handleGoogleLogin = handleGoogleLogin;
window.handleFacebookLogin = handleFacebookLogin;

