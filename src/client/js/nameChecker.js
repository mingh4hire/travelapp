function checkForName(inputText) {
    if (inputText.length > 5 && inputText.length < 100) {
        return true;

    }
    return false;
}

export {
    checkForName
}