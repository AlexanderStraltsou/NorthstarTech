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