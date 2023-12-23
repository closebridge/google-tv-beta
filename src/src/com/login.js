var loginStatus = false
var loginInfo = {
    username: 'adadadad',
    password: '123456789',
    //display_name: 'my ginger kitten'
};


function callLoginPopup() {
    const popUp = document.getElementById('loginSystem');
    const userManager = document.getElementById('userIDStats');
    const theName = document.getElementById('userToken');
    
    if (loginStatus === false) {
        popUp.classList.toggle('invisible');
    } else {
        userManager.classList.toggle('invisible');
        theName.innerText = 'Hey, ' + loginInfo.username + '!';
    }
}

function toggleLoginPopup() {
    const whole = document.getElementById('loginSystem')
    
    whole.classList.toggle('invisible');
    
};


var loginInfoArray = [];

    async function readMe() {
        try {
            const response = await fetch("rockyou.txt");
            const text = await response.text();
            const lines = text.split('\n');

            loginInfoArray = lines.map((line) => {
                const [username, password] = line.split(' : ');
                return {
                    username: username,
                    password: password,
                };
            });

            //console.log("Fetched credentials array:", loginInfoArray);
        } catch (error) {
            //console.error("Error fetching credentials:", error);
        }
    }


    document.getElementById('loginPassword').addEventListener('keydown', loginKey);

    function loginKey(event) {
        if (event.key === 'Enter') {
                event.preventDefault();
                validateLogin();
        };
    };

    async function validateLogin() {
        var usernameInput = document.getElementById('loginID').value;
        var passwordInput = document.getElementById('loginPassword').value;
        const skillIssue = document.getElementById('skillIssue');

        try {
            await readMe();

            const validCredentials = loginInfoArray.some((credentials) => {
                return (
                    credentials.username === usernameInput &&
                    credentials.password === passwordInput
                );
            });

            if (validCredentials) {
                alert('Login successful!');
                skillIssue.innerHTML = '';
                loginStatus = true;
                loginInfo = {
                    username: usernameInput,
                    password: passwordInput
                };
                toggleLoginPopup();
            } else {
                skillIssue.innerText = 'Incorrect username/password';
            }
        } catch (error) {
            //console.error("Error in data:", error);
        }
    }

function userTokenLogout() {
    const whole2 = document.getElementById('userIDStats')
    loginStatus = false
    var loginInfo = {
        username: '',
        password: '',
        display_name: ''
    };
    alert('Logged out!');
    whole2.classList.toggle('invisible');
};

function plagueUser() {

}

function toggleButtone() {
    toggleLoginPopup();
    toggleSignupWindow();
}

function toggleSignupWindow () {
    const popUp = document.getElementById('signupSystem');
    popUp.classList.toggle('invisible');
}

