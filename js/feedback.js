const feedbackForm = document.querySelector("#feedbackForm");
const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const topicInput = document.querySelector("#topic");
const commentsInput = document.querySelector("#comments");
const websiteInput = document.querySelector("#website");
const commentsCount = document.querySelector("#commentsCount");
const formStatus = document.querySelector("#formStatus");
const clearButton = document.querySelector("#clearButton");
const submitButton = document.querySelector("#submitButton");


const MIN_COMMENT_LENGTH = 15;
const formFields = [
  fullNameInput,
  emailInput,
  topicInput,
  commentsInput,
  websiteInput
];

let successTimer = null;
const touchedFields = new Set();


function showFieldError(input, message) {
  const errorElement = document.querySelector(`#${input.id}Error`);
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  input.setAttribute("aria-invalid", "true");
  errorElement.textContent = message;
  return false;
}


function clearFieldError(input) {
  const errorElement = document.querySelector(`#${input.id}Error`);
  input.classList.remove("is-invalid");
  input.setAttribute("aria-invalid", "false");
  errorElement.textContent = "";
}


function markFieldValid(input) {
  clearFieldError(input);
  input.classList.add("is-valid");
  return true;
}


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


function validateEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (email.length === 0) {
    return showFieldError(emailInput, "Please enter your email address.");
  }
  if (!emailPattern.test(email) || !emailInput.validity.valid) {
    return showFieldError(emailInput, "Please enter a valid email address, for example name@example.com.");
  }
  return markFieldValid(emailInput);
}


function validateTopic() {
  if (topicInput.value === "") {
    return showFieldError(topicInput, "Please choose a topic of interest.");
  }
  return markFieldValid(topicInput);
}


function validateComments() {
  const comments = commentsInput.value.trim();

  if (comments.length === 0) {
    return showFieldError(commentsInput, "Please enter your comments.");
  }
  if (comments.length < MIN_COMMENT_LENGTH) {
    return showFieldError(
      commentsInput,
      `Please write at least ${MIN_COMMENT_LENGTH} characters. You currently have ${comments.length}.`
    );
  }
  return markFieldValid(commentsInput);
}


function validateWebsite() {
  if (websiteInput.value.trim() === "") {
    return markFieldValid(websiteInput);
  }
  if (!websiteInput.validity.valid) {
    return showFieldError(websiteInput, "Please enter a valid URL, including https://.");
  }
  return markFieldValid(websiteInput);
}


function updateCharacterCounter() {
  const characterCount = commentsInput.value.length;
  const enoughCharacters = characterCount >= MIN_COMMENT_LENGTH;

  commentsCount.textContent = `${characterCount} / ${MIN_COMMENT_LENGTH} characters`;
  commentsCount.classList.toggle("is-enough", enoughCharacters);
  commentsCount.setAttribute(
    "aria-label",
    `${characterCount} characters entered. Minimum ${MIN_COMMENT_LENGTH} characters.`
  );
}


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


function clearSuccessTimer() {
  if (successTimer !== null) {
    window.clearTimeout(successTimer);
    successTimer = null;
  }
}

function clearStatus() {
  clearSuccessTimer();
  formStatus.textContent = "";
  formStatus.className = "form-status";
}


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



feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearStatus();


  const validationResults = [
    validateFullName(),
    validateEmail(),
    validateTopic(),
    validateComments(),
    validateWebsite()
  ];

  formFields.forEach((input) => touchedFields.add(input));

  if (validationResults.includes(false)) {
    const firstInvalidField = feedbackForm.querySelector(".is-invalid");
    formStatus.textContent = "Please correct the highlighted fields and try again.";
    formStatus.classList.add("error-summary");

    if (firstInvalidField) {
      firstInvalidField.focus();
    }
    return;
  }

    const submittedName = fullNameInput.value.trim();

  resetForm();
  formStatus.textContent = `Thanks for your feedback, ${submittedName}!`;
  formStatus.classList.add("success");

  successTimer = window.setTimeout(() => {
    formStatus.textContent = "";
    formStatus.className = "form-status";
    successTimer = null;
  }, 4000);
});