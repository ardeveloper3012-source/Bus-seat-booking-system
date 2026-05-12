// Contact Form Validation and Submission

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      // Validation happens here; if invalid we stop submission.
      const fullName = document.getElementById('fullName');
      const emailAddress = document.getElementById('emailAddress');
      const message = document.getElementById('message');

      // Remove any existing error messages
      removeErrorMessages();

      // Validation flag
      let isValid = true;

      // Validate Full Name
      if (!fullName.value.trim()) {
        showError(fullName, 'Please enter your full name');
        isValid = false;
      }

      // Validate Email Address
      if (!emailAddress.value.trim()) {
        showError(emailAddress, 'Please enter your email address');
        isValid = false;
      } else if (!isValidEmail(emailAddress.value.trim())) {
        showError(emailAddress, 'Please enter a valid email address');
        isValid = false;
      }

      // Validate Message
      if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
      }

      if (!isValid) return;

      // If form is valid, show success message (after successful POST)
      const endpoint = contactForm.getAttribute('action');

      // IMPORTANT: Build the payload that Formspree should receive.
      const payload = new FormData();
      payload.append('fullName', fullName.value.trim());
      payload.append('emailAddress', emailAddress.value.trim());
      payload.append('message', message.value.trim());

      // Include the optional hidden inputs already present in the form.
      const subjectEl = contactForm.querySelector('input[name="_subject"]');
      if (subjectEl) payload.append('_subject', subjectEl.value);

      const gotchaEl = contactForm.querySelector('input[name="_gotcha"]');
      if (gotchaEl) payload.append('_gotcha', gotchaEl.value);

      console.log('Form Data Submitted:', {
        fullName: fullName.value.trim(),
        emailAddress: emailAddress.value.trim(),
        message: message.value.trim()
      });

      try {
        // POST exactly what user typed
        const res = await fetch(endpoint, {
          method: 'POST',
          body: payload,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error(`Formspree request failed: ${res.status}`);
        }

        showSuccess();

        // Reset the form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          hideSuccess();
        }, 5000);
      } catch (err) {
        console.error(err);
        // Basic fallback error UI
        alert('Message sending failed. Please try again.');
      }
    });
  }
  
  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Function to show error message
  function showError(inputElement, message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    // Add error class to input
    inputElement.style.borderColor = '#dc3545';
    
    // Insert error message after input
    inputElement.parentNode.appendChild(errorDiv);
  }
  
  // Function to remove all error messages
  function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach(function(error) {
      error.remove();
    });
    
    // Reset input border colors
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(function(input) {
      input.style.borderColor = '#e0e0e0';
    });
  }
  
  // Function to show success message
  function showSuccess() {
    // Check if success message already exists
    let successDiv = document.querySelector('.success-message');
    
    if (!successDiv) {
      successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
      
      // Insert before the form
      const form = document.getElementById('contactForm');
      form.parentNode.insertBefore(successDiv, form);
    }
    
    successDiv.classList.add('show');
  }
  
  // Function to hide success message
  function hideSuccess() {
    const successDiv = document.querySelector('.success-message');
    if (successDiv) {
      successDiv.classList.remove('show');
    }
  }
  
  // Add real-time validation on input
  const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
  formInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      // Remove error when user starts typing
      this.style.borderColor = '#e0e0e0';
      const errorDiv = this.parentNode.querySelector('.field-error');
      if (errorDiv) {
        errorDiv.remove();
      }
    });
  });
});

