export default function(message){
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-container');
    errorContainer.innerHTML = message;

    return {errorContainer};
}