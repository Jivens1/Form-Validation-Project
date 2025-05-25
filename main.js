const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

function showError(input, message) {
  const formControl = input.closest('.form-control');
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.closest('.form-control');
  formControl.classList.remove('error');
}

function checkEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, 'Enter a valid email');
    return false;
  }
}

function checkRequired(inputs) {
  let isValid = true;
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${input.previousElementSibling.innerText} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });
  return isValid;
}

function checkPassword(input) {
  if (input.value.length < 6) {
    showError(input, 'Password must be at least 6 characters');
    return false;
  }
  showSuccess(input);
  return true;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const required = checkRequired([username, email, password]);
  const validEmail = checkEmail(email);
  const validPassword = checkPassword(password);

  if (required && validEmail && validPassword) {
    alert('Form submitted successfully!');
    form.reset();
  }
});
