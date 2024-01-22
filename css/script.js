const nameInput = document.getElementById('name');
const nameValidation = document.getElementById('nameValidation');
const passwordInput = document.getElementById('password');
const passwordStrength = document.getElementById('passwordStrength');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-level');
const instruction = document.querySelector('.instruction');
const confirmPasswordInput = document.getElementById('confirmPassword');
const confirmPasswordValidation = document.getElementById('confirmPasswordValidation');
const emailInput = document.getElementById('email');
const emailValidation = document.getElementById('emailValidation');
const phoneInput = document.getElementById('phone');
const phoneValidation = document.getElementById('phoneValidation');

nameInput.addEventListener('input', validateName);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);

function validateName() {
  const nameRegex = /^[A-Za-z ]+$/;
  if (!nameRegex.test(nameInput.value)) {
    nameValidation.innerHTML = 'Only alphabets and spaces are allowed';
  } else {
    nameValidation.innerHTML = '';
  }
}

function validatePassword() {
  const password = passwordInput.value;
  if (password.trim() !== '') {
    passwordStrength.style.display = 'block';
    instruction.style.display = 'block';
    const strength = calculatePasswordStrength(password);
    updateStrengthMeter(strength);
    updateInstruction(strength);
  } else {
    passwordStrength.style.display = 'none';
    instruction.style.display = 'none';
    instruction.innerHTML = '';
  }
}

function validateConfirmPassword() {
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordValidation.innerHTML = 'Passwords do not match';
  } else {
    confirmPasswordValidation.innerHTML = '';
  }
}

function validateEmail() {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailInput.value)) {
    emailValidation.innerHTML = 'Please enter a valid email address';
  } else {
    emailValidation.innerHTML = '';
  }
}

function validatePhone() {
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneInput.value)) {
    phoneValidation.innerHTML = 'Please enter a 10-digit phone number';
  } else {
    phoneValidation.innerHTML = '';
  }
}

function updateStrengthMeter(strength) {
  const colors = {
    'Weak': '#f8d7da',
    'Moderate': '#ffeeba',
    'Strong': '#d4edda'
  };

  strengthBar.style.backgroundColor = colors[strength];
  strengthBar.style.width = `${(strength === 'Weak' ? 25 : strength === 'Moderate' ? 50 : 100)}%`;
  strengthText.innerHTML = strength;
}

function updateInstruction(strength) {
  const instructionText = {
    'Weak': 'Password must contain small and capital letters, special characters, and numbers.',
    'Moderate': 'Password could be stronger. Consider adding more characters.',
    'Strong': 'Password is strong! Well done.'
  };

  const message = instructionText[strength];
  const instructionDiv = document.querySelector('.instruction');
  
  if (instructionDiv) {
    instructionDiv.innerHTML = `<p>${message}</p>`;
    instructionDiv.style.display = 'block';
  }
}

function calculatePasswordStrength(password) {
  const length = password.length;
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  if (length < 6 || (!hasLetters && !hasNumbers && !hasSpecialChars)) {
    return 'Weak';
  } else if (length >= 6 && ((hasLetters && hasNumbers && hasSpecialChars))) {
    return 'Strong';
  } else {
    return 'Moderate';
  }
}

function validateForm() {
  validateName();
  const name = document.getElementById('name').value;

  // Redirect to the next page with the name as a query parameter
  window.location.href = `userPage.html?name=${encodeURIComponent(name)}`;
  validatePassword();
  validateConfirmPassword();
  validateEmail();
  const email = document.getElementById('email').value;

  // Redirect to the next page with the name as a query parameter
  window.location.href = `userPage.html?name=${encodeURIComponent(email)}`;
  validatePhone();

  return true; // Form is valid, allow submission
}
