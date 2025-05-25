const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

// Show error message
function showError(input, message) {
  const formControl = input.closest('.form-control');
  formControl.classList.remove('success');
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.closest('.form-control');
  formControl.classList.remove('error');
  formControl.classList.add('success');
  const small = formControl.querySelector('small');
  small.innerText = '';
}

// Check if email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, 'Email is not valid');
    return false;
  }
}

// Check required fields
function checkRequired(inputs) {
  let allFilled = true;
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      allFilled = false;
    } else {
      showSuccess(input);
    }
  });
  return allFilled;
}

// Get field name with first capital letter
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const allFilled = checkRequired([username, email, password]);
  const validEmail = checkEmail(email);

  if (allFilled && validEmail) {
    alert('Form submitted successfully!');
    form.reset();
    document.querySelectorAll('.form-control').forEach(fc => fc.classList.remove('success'));
  }
});
