function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (!Client.checkForName(formText)) {
        alert('Must be at least 5 characers long and less than 100 characters long');
        return;
    }
    console.log("::: Form Submitted :::")
    fetch('/travel', {
            method: 'POST',
            body: JSON.stringify({
                message: formText
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then(res => {

            console.log('converting to json for ', res)
            console.log('done');
            return res.json()

        })
        .then(function (res) {

            document.getElementById('image').src = res.image;
            // document.getElementById('subjectivity').innerHTML = res.subjectivity;
            // document.getElementById('text').innerHTML = res.text;
            // document.getElementById('polarity_confidence').innerHTML = res.polarity_confidence;
            // document.getElementById('subjectivity_confidence').innerHTML = res.subjectivity_confidence;


        })
        .catch(err => {
            console.log('******************')
            console.log('******************')
            console.log('******************')
            console.log('printing code ', err)
            console.log('******************')
            console.log('******************')
            alert('error on return ' + err);
        })
}


export {
    handleSubmit,
}