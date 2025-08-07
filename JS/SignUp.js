const submitBtn = document.getElementById('signup-btn');

let nameValid = false;
let emailValid = false;
let passwordValid = false;
let phoneValid = false;
let confirmPassValid = false;

function updateButtonState() {
  const valid = nameValid && emailValid && passwordValid && phoneValid && confirmPassValid;

  if (valid) {
    submitBtn.disabled = false;
    submitBtn.classList.add('active');
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove('active');
  }
}

//Name 
document.getElementById('signup-name').addEventListener('input', (e) => {
  const name = e.target.value.trim();
  const nameError = document.getElementById('signup-name-error');

  nameValid = name.length > 0;
  nameError.textContent = nameValid ? '' : 'Name cannot be empty.';
  updateButtonState();
});

//Email
document.getElementById('signup-email').addEventListener('input', (e) => {
  const email = e.target.value.trim();
  const emailError = document.getElementById('signup-email-error');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  emailValid = emailRegex.test(email);
  emailError.textContent = emailValid ? '' : 'Please enter a valid email address.';
  updateButtonState();
});

// Password
document.getElementById('signup-pass').addEventListener('input', (e) => {
  const value = e.target.value;
  const strengthMsg = document.getElementById('signup-pass-strength');
  const passwordError = document.getElementById('signup-password-error');

  let strength = '';
  let color = '';

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const mediumPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (strongPasswordRegex.test(value)) {
    strength = 'Strong';
    color = 'green';
    passwordValid = true;
    passwordError.textContent = '';
  } else if (mediumPasswordRegex.test(value)) {
    strength = 'Medium';
    color = 'orange';
    passwordValid = true;
    passwordError.textContent = '';
  } else {
    strength = 'Poor';
    color = 'red';
    passwordValid = false;
    passwordError.textContent = 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, and number.';
  }

  if (strengthMsg) {
    strengthMsg.textContent = strength;
    strengthMsg.style.color = color;
  }

  updateButtonState();
});

// Confirm password
document.getElementById('signup-confirm_pass').addEventListener('input', function () {
  const password = document.getElementById('signup-pass').value;
  const confirm = this.value;
  const confirmError = document.getElementById('signup-confirm-password-error');

  confirmPassValid = confirm === password;
  confirmError.textContent = confirmPassValid ? '' : 'Passwords do not match.';
  updateButtonState();
});

// Mobile 
document.getElementById('signup-mobile').addEventListener('input', (e) => {
  const mobile = e.target.value.trim();
  const mobileError = document.getElementById('signup-mobile-error');
  const mobileRegex = /^(?:\d{10}|\d{3}([-. ])\d{3}\1\d{4})$/;

  phoneValid = mobileRegex.test(mobile);
  mobileError.textContent = phoneValid ? '' : 'Enter a valid 10-digit mobile number.';
  updateButtonState();
});
