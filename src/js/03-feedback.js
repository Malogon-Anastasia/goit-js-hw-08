import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
 
const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    email: document.querySelector('.feedback-form input')
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));


let localValue = {};

populateForm();

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    console.log(localValue);
    localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(evt) {
    const formData = new FormData(refs.form);
  formData.forEach((a, b) => (localValue[b] = a));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localValue));
}

function populateForm(evt) {
const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY) || "");
// console.log(savedMessage)
    if (savedMessage) {
        console.log(savedMessage)
        refs.email.value = savedMessage.email;
        refs.textarea.value = savedMessage.message;
}
}

