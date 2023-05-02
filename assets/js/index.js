import silverBox from "../libraries/silverBox_1.0.0-rc6_min/silverBox.min.js";

const startApp = document.querySelector('#startApp')

startApp.addEventListener("click", () => {
    // creating a popUp modal
    silverBox({
        silverBoxId: "nameFakeInput",
        theme: "dark",
        html: inputTemplate(),
        confirmButton: {
            buttonId: 'generate-button',
            text: "Generate",
            closeOnClick: false
        },
    })

    // calling generate function
    generate()
})

// generate button event listener
function generate() {
    // select generate button
    let generateBtn = document.querySelector("#generate-button")

    generateBtn.addEventListener('click', () => {
        silverBox({
            title: "Result",
            theme: 'dark',
            removePrevLoadings: 'all',
            removePrevBoxes: 'all',
            customIconId: 'icon',
            customIcon: "assets/images/male.svg",
            centerContent: true,
        })

    })
}

function apiCall() {

    // create xhr object
    const xhr = new XMLHttpRequest()

    // open 
    xhr.open("GET", "https://api.namefake.com/", false)

    let apiDataBase
    // onload
    xhr.onload = function () {
        apiDataBase = JSON.parse(this.responseText)
        resultTemplate()
    }
    // send
    xhr.send()
    return apiDataBase
}


// templates
function inputTemplate() {
    return (
        `
        <!-- input section -->
        <section id="name-fake-input">
            <div class="container">
                <!-- input wrapper -->
                <div class="input-wrapper">
                    <!-- label -->
                    <label for="gender">Gender</label>
                    <!-- select -->
                    <select name="gender" id="gender">
                        <option value="random">random</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </div>
            </div>
        </section>`
    )
}

function resultTemplate() {
    return (` <section id="result">
        <div id="information">
            <div>Name: ${apiCall().name}</div>
            <div>Email: ${apiCall().email_d}</div>
            <div>Height: ${apiCall().height}</div>
            <div>Weight: ${apiCall().weight}</div>
            <div>Phone: ${apiCall().phone_h}</div>
        </div>
    </section>`
    )
}
