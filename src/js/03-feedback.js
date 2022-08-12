const throttle = require("lodash.throttle");

const formRef = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const localDataSaved = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

let formData = localDataSaved ?? {};

if (formData.email) formRef.elements.email.value = formData.email;
if (formData.message) formRef.elements.message.value = formData.message;

// formRef.elements.email.value = formData?.email;
// formRef.elements.message.value = formData?.message;
    
formRef.addEventListener('submit', onSubmitClick);
formRef.addEventListener('input', throttle(onFormFieldsTyping, 500));

function onFormFieldsTyping(event) {

    formData[event.target.name] = event.target.value;

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));    
}

function onSubmitClick(event) {
    event.preventDefault();

    if (event.currentTarget.elements.email.value === '' || event.currentTarget.elements.message.value === '') {
        alert("Необхідно заповнити усі поля");
        return;
    }

    console.log(formData);    

    formData = {};
        
    localStorage.removeItem(LOCALSTORAGE_KEY);

    event.currentTarget.reset();
};