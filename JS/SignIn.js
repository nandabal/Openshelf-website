
const signinBtn = document.getElementById('signin-btn');

const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const strengthMsg = document.getElementById('pass-strength');

let emailValid = false;
let passwordValid = false;

// button visibility
function updateLoginButtonState() {
  const valid = emailValid && passwordValid;

   if (valid) {
    signinBtn.disabled = false;
    signinBtn.classList.add('active');
  } else {
    signinBtn.disabled = true;
    signinBtn.classList.remove('active');
  }
}

// Email
document.getElementById('email').addEventListener('input', (e) => {
  const email = e.target.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  emailValid = emailRegex.test(email);
  emailError.textContent = emailValid ? '' : 'Please enter a valid email address.';
  updateLoginButtonState();
});

// Password
document.getElementById('pass').addEventListener('input', (e) => {
  const value = e.target.value;
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
    passwordError.textContent = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number.';
  }

  if (strengthMsg) {
    strengthMsg.textContent = strength;
    strengthMsg.style.color = color;
  }

  updateLoginButtonState();
});


