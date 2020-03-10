import {
    checkForName
} from './js/nameChecker'
import {
    handleSubmit
} from './js/formHandler'
import './styles/resets.scss'


export {
    checkForName,
    handleSubmit
}

if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}