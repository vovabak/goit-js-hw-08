const throttle = require("lodash.throttle");

const formRef = document.querySelector('.feedback-form');
const emailInputRef = document.querySelector('input');
const messageRef = document.querySelector('textarea');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const localDataSaved = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    
formRef.addEventListener('submit', onSubmitClick);
formRef.addEventListener('input', throttle(onFormFieldsTyping, 500));

function onFormFieldsTyping() {
    
    const localData = {
        email: emailInputRef.value,
        message: messageRef.value,
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(localData));
}

if (localDataSaved) {
    emailInputRef.value = localDataSaved.email;
    messageRef.value = localDataSaved.message;
}

function onSubmitClick(event) {
    event.preventDefault();

    console.log(`email: ${emailInputRef.value}, message: ${messageRef.value}`);
    
    localStorage.removeItem(LOCALSTORAGE_KEY);

    event.currentTarget.reset();
};