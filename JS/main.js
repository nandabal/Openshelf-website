const isSignup = document.getElementById('mobile') !== null; //signup return not null, for mobile input, and can take confirm password input also
const submitBtn = document.getElementById(isSignup ? 'signup-btn' : 'signin-btn');

let emailValid = false;
let passwordValid = false;
let phoneValid = false;
let confirmPassValid = false;

function updateButtonState() {
//   const valid = emailValid && passwordValid && phoneValid && confirmPassValid;
  let valid;
  if (isSignup) {
    valid = emailValid && passwordValid && phoneValid && confirmPassValid;
  } else {
    valid = emailValid && passwordValid;
  }

  if (valid) {
    submitBtn.disabled = false;
    submitBtn.classList.add('active');
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove('active');
  }
}

// Email
document.getElementById('email').addEventListener('input', (e) => {
  const email = e.target.value.trim();
  const emailError = document.getElementById('email-error');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  emailValid = emailRegex.test(email);
  emailError.textContent = emailValid ? '' : 'Please enter a valid email address.';
  updateButtonState();
});

// Password
document.getElementById('pass').addEventListener('input', (e) => {
  const value = e.target.value;
  const strengthMsg = document.getElementById('pass-strength');
  const passwordError = document.getElementById('password-error');

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
    passwordValid = false;
    passwordError.textContent = '';
  } else {
    strength = 'Poor';
    color = 'red';
    passwordValid = false;
    passwordError.textContent = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.';
  }

  if (strengthMsg) {
    strengthMsg.textContent = strength;
    strengthMsg.style.color = color;
  }

  updateButtonState();
});
  
// Confirm password
if(isSignup){ //since confirm password input is only present in signup form
     document.getElementById('confirm_pass').addEventListener('input', function () {
    const password = document.getElementById('pass').value;
    const confirm = this.value;
    const confirmError = document.getElementById('confirm-password-error');

    confirmPassValid = confirm === password && passwordValid;
    confirmError.textContent = confirmPassValid ? '' : 'Passwords do not match.';
    updateButtonState();
  });
}

//mobile
if (isSignup) {  //since mobile input is only present in signup form
  document.getElementById('mobile').addEventListener('input', (e) => {
    const mobile = e.target.value.trim();
    const mobileError = document.getElementById('mobile-error');
    const mobileRegex = /^(?:\d{10}|\d{3}([-. ])\d{3}\1\d{4})$/;

    phoneValid = mobileRegex.test(mobile);
    mobileError.textContent = phoneValid ? '' : 'Enter a valid 10-digit mobile number.';
    updateButtonState();
  });
}
