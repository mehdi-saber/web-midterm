// This function calls api and shows it's result and also
// if there's is a saved result for the name shows it in specified block.
function checkGender() {
    const xhttp = new XMLHttpRequest();
    let inputName = document.getElementById("name-input").value;

    // This call back calls after api result is ready
    // It parse the result and update the result
    xhttp.onload = function () {
        //Detect http status response (200 = Ok)
        if (this.status === 200) {
            document.getElementById("error-box").style.display = "none"
            document.getElementById("gender-placeholder")
            let apiResp = JSON.parse(this.response)
            if (apiResp["gender"] === null) {
                document.getElementById("error-box").style.display = "block"
                document.getElementById("error-box").innerText = "No prediction was found for the name..."
            } else {
                let genderResp = apiResp["gender"].charAt(0).toUpperCase() + apiResp["gender"].slice(1);
                let probabilityResp = apiResp["probability"]
                document.getElementById("gender-placeholder").innerText = genderResp
                document.getElementById("accuracy-placeholder").innerText = probabilityResp
                let storageKey = "gender-" + inputName
                if (localStorage.getItem(storageKey)) {
                    document.getElementById('save-gender-placeholder').innerText = localStorage.getItem(storageKey)
                    // Saving name in this hidden input so if the user changes
                    // input we can have the name corresponding to clear button
                    document.getElementById("saved-ans-name").value = inputName
                    document.getElementById('saved-ans-container').style.display = "block"
                } else {
                    document.getElementById('saved-ans-container').style.display = "none"
                }
            }
        } else {
            document.getElementById("error-box").style.display = "block"
            document.getElementById("error-box").innerText = "Something went wrong in api communication..."
        }
    }
    // checks for correct input len
    if (inputName.length > 255) {
        alert("Name input must be less than 255 characters.")
        return
    }

    // Checks for valid characters in input(english and space allowed)
    const charCheckReg = /^[A-Za-z ]+$/g;
    if (!inputName.match(charCheckReg)) {
        alert("name must contain english characters and space")
        return
    }

    // Sending request to api
    xhttp.open("GET", "https://api.genderize.io/?name=" + inputName, true);
    xhttp.send();
}

// Saving result given by user
function saveGender() {
    let inputName = document.getElementById("name-input").value;
    let inputGender = document.querySelector('input[name="gender"]:checked').value;
    let storageKey = "gender-" + inputName
    localStorage.setItem(storageKey, inputGender);
}

// Removing saved result for user from local storage
function clearSavedGender() {
    // Getting name in this hidden input so if the user changes
    // input we can have the name corresponding to clear button
    let inputName = document.getElementById("saved-ans-name").value;
    let storageKey = "gender-" + inputName
    localStorage.removeItem(storageKey)
    document.getElementById('saved-ans-container').style.display = "none"
}