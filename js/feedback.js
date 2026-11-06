// Get form elements
const feedbackForm = document.querySelector("#feedbackForm");
const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const topicInput = document.querySelector("#topic");
const commentsInput = document.querySelector("#comments");
const websiteInput = document.querySelector("#website");
const commentsCount = document.querySelector("#commentsCount");
const formStatus = document.querySelector("#formStatus");
const clearButton = document.querySelector("#clearButton");


const MIN_COMMENT_LENGTH = 15;
const MAX_COMMENT_LENGTH = 50;


const formFields = [
  fullNameInput,
  emailInput,
  topicInput,
  commentsInput,
  websiteInput
];

let successTimer = null;
const touchedFields = new Set();

// Display a field error
function showFieldError(input, message) {
  const errorElement = document.querySelector(`#${input.id}Error`);

  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  input.setAttribute("aria-invalid", "true");
  errorElement.textContent = message;

  return false;
}

// Clear a field error
function clearFieldError(input) {
  const errorElement = document.querySelector(`#${input.id}Error`);

  input.classList.remove("is-invalid");
  input.setAttribute("aria-invalid", "false");
  errorElement.textContent = "";
}

// Mark a field as valid
function markFieldValid(input) {
  clearFieldError(input);
  input.classList.add("is-valid");

  return true;
}

// Validate the full name
function validateFullName() {
  const name = fullNameInput.value.trim();
  const namePattern = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u;

  if (name.length === 0) {
    return showFieldError(fullNameInput, "Please enter your full name.");
  }

  if (name.length < 2) {
    return showFieldError(fullNameInput, "Name must contain at least 2 characters.");
  }

  if (!namePattern.test(name)) {
    return showFieldError(fullNameInput, "Use letters, spaces, apostrophes or hyphens only.");
  }

  return markFieldValid(fullNameInput);
}

// Validate the email address
function validateEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (email.length === 0) {
    return showFieldError(emailInput, "Please enter your email address.");
  }

  if (!emailPattern.test(email) || !emailInput.validity.valid) {
    return showFieldError(
      emailInput,
      "Please enter a valid email address, for example name@example.com."
    );
  }

  return markFieldValid(emailInput);
}

// Validate the selected topic
function validateTopic() {
  if (topicInput.value === "") {
    return showFieldError(topicInput, "Please choose a topic of interest.");
  }

  return markFieldValid(topicInput);
}

// Validate the comments length
function validateComments() {
  const comments = commentsInput.value.trim();

  if (comments.length === 0) {
    return showFieldError(commentsInput, "Please enter your comments.");
  }

  if (comments.length < MIN_COMMENT_LENGTH ) {
    return showFieldError(
      commentsInput,
      `Please write at least ${MIN_COMMENT_LENGTH} characters. You currently have ${comments.length}.`
    );
  }

  if (comments.length > MAX_COMMENT_LENGTH) {
    return showFieldError(
      commentsInput,
      `Comments cannot exceed ${MAX_COMMENT_LENGTH} characters. You currently have ${comments.length}.`
    );
  }

  return markFieldValid(commentsInput);
}

// Validate the optional website URL
function validateWebsite() {
  if (websiteInput.value.trim() === "") {
    return markFieldValid(websiteInput);
  }

  if (!websiteInput.validity.valid) {
    return showFieldError(
      websiteInput,
      "Please enter a valid URL, including https://."
    );
  }

  return markFieldValid(websiteInput);
}

// Update the comments character counter
function updateCharacterCounter() {
  const characterCount = commentsInput.value.length;
  const trimmedLength = commentsInput.value.trim().length;
  const isValidLength = trimmedLength >= MIN_COMMENT_LENGTH && trimmedLength <= MAX_COMMENT_LENGTH;

  commentsCount.textContent = `${characterCount} / ${MAX_COMMENT_LENGTH} characters`;
  commentsCount.classList.toggle("is-valid-length", isValidLength);

  commentsCount.setAttribute(
    "aria-label",
    `${characterCount} characters entered. Required length is between ${MIN_COMMENT_LENGTH} and ${MAX_COMMENT_LENGTH} characters.`
  );
}

// Select the correct validation function
function validateField(input) {
  switch (input) {
    case fullNameInput:
      return validateFullName();

    case emailInput:
      return validateEmail();

    case topicInput:
      return validateTopic();

    case commentsInput:
      return validateComments();

    case websiteInput:
      return validateWebsite();

    default:
      return true;
  }
}

// Manage the success message timer
function clearSuccessTimer() {
  if (successTimer !== null) {
    window.clearTimeout(successTimer);
    successTimer = null;
  }
}

// Clear the form status message
function clearStatus() {
  clearSuccessTimer();
  formStatus.textContent = "";
  formStatus.className = "form-status";
}

// Reset all form fields and validation states
function resetForm() {
  feedbackForm.reset();
  touchedFields.clear();

  formFields.forEach((input) => {
    input.classList.remove("is-invalid", "is-valid");
    input.setAttribute("aria-invalid", "false");
    document.querySelector(`#${input.id}Error`).textContent = "";
  });

  updateCharacterCounter();
  clearStatus();
}

// Validate fields when users leave or edit them
formFields.forEach((input) => {
  input.addEventListener("blur", () => {
    touchedFields.add(input);
    validateField(input);
  });

  input.addEventListener("input", () => {
    if (input === commentsInput) {
      updateCharacterCounter();
    }

    if (touchedFields.has(input)) {
      validateField(input);
    }
  });

  input.addEventListener("change", () => {
    if (touchedFields.has(input)) {
      validateField(input);
    }
  });
});

// Handle form submission
feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearStatus();

  // Validate all fields
  const validationResults = [
    validateFullName(),
    validateEmail(),
    validateTopic(),
    validateComments(),
    validateWebsite()
  ];

  formFields.forEach((input) => touchedFields.add(input));

  // Show errors and focus the first invalid field
  if (validationResults.includes(false)) {
    const firstInvalidField = feedbackForm.querySelector(".is-invalid");

    formStatus.textContent = "Please correct the highlighted fields and try again.";
    formStatus.classList.add("error-summary");

    if (firstInvalidField) {
      firstInvalidField.focus();
    }

    return;
  }

  // Show success message after valid submission
  const submittedName = fullNameInput.value.trim();

  resetForm();

  formStatus.textContent = `Thanks for your feedback, ${submittedName}!`;
  formStatus.classList.add("success");

  // Automatically clear the success message after 4 seconds
  successTimer = window.setTimeout(() => {
    formStatus.textContent = "";
    formStatus.className = "form-status";
    successTimer = null;
  }, 4000);
});

// Clear the form when the clear button is clicked
clearButton.addEventListener("click", resetForm);

// Set initial validation states and character count
formFields.forEach((input) => {
  input.setAttribute("aria-invalid", "false");
});

updateCharacterCounter();