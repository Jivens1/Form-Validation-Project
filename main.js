// Helper functions to select elements
const id = (id) => document.getElementById(id);
const classes = (classes) => document.getElementsByClassName(classes);

// Form elements
const username = id("username"),
  email = id("email"),
  password = id("password"),
  form = id("form"),
  errorMsg = classes("error"),
  successIcon = classes("success-icon"),
  failureIcon = classes("failure-icon");

// Add real-time validation
[username, email, password].forEach(field => {
  field.addEventListener('input', validateField);
});

// Form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  validateField({ target: username });
  validateField({ target: email });
  validateField({ target: password });

  if (isFormValid()) {
    // Form is valid - can submit or show success
    console.log("Form is valid!");
    // form.submit(); // Uncomment to enable actual submission
  }
});

function validateField(e) {
  const field = e.target;
  let valid = false;
  let message = "";
  
  if (field === username) {
    valid = field.value.trim() !== "";
    message = "Username cannot be blank";
  } 
  else if (field === email) {
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    message = "Please enter a valid email";
  }
  else if (field === password) {
    valid = field.value.length >= 8;
    message = "Password must be at least 8 characters";
  }

  const serial = field === username ? 0 : field === email ? 1 : 2;
  
  if (!valid) {
    errorMsg[serial].innerHTML = message;
    field.style.border = "2px solid red";
    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity = "0";
  } else {
    errorMsg[serial].innerHTML = "";
    field.style.border = "2px solid green";
    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "1";
  }
}

function isFormValid() {
  return username.value.trim() !== "" &&
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) &&
         password.value.length >= 8;
}

// Image fallback handling
const illustration = document.querySelector('.illustration');
illustration.onerror = function() {
  this.src = 'images/fallback.png';
  console.log('Loaded fallback image');
};
