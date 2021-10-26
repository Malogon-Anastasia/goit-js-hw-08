import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
 
const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
};


refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

let formData = {};
refs.form.addEventListener('input', evt => {
    formData[evt.target.name] = evt.target.value;
    })


populateForm();


function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(evt) {
    // const message = evt.target.value;
localStorage.setItem(STORAGE_KEY,  JSON.stringify(formData));
}

function populateForm(evt) {
const savedMessage = localStorage.getItem(STORAGE_KEY);
if (savedMessage) {
    const saved = JSON.parse(savedMessage);
    console.log(savedMessage);
    refs.form.email.value = saved.email;
    refs.textarea.value = saved.message;
}
}
