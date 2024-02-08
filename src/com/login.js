const loginBanner = document.getElementById('loginRequired')

document.onload = checkIfLogon;



function checkIfLogon() {
    if (localStorage.loginStatus == false || sessionStorage.loginStatus == false || localStorage.loginStatus == null || sessionStorage.loginStatus == null ) {
        window.location.href = "./login.html";
    };
};

function callLoginPopup() {
    const userManager = document.getElementById('userIDStats');
    const theName = document.getElementById('userToken');
    
    
    if (localStorage.loginStatus == 'true') {
        if (sessionStorage.loginStatus == 'false') {
            userManager.classList.toggle('invisible');
            theName.innerText = 'Hey, ' + localStorage.getItem('username') + '!';
        } else {
            userManager.classList.toggle('invisible');
            theName.innerText = 'An exception has met, please log out and re-login';
            theName.className = 'text-red-700';
        };
    } else if (sessionStorage.loginStatus == 'true' ) {
        if (localStorage.loginStatus == 'false') {
            userManager.classList.toggle('invisible');
            theName.innerText = 'Hey, ' + sessionStorage.getItem('username') + '!';
        } else {
            userManager.classList.toggle('invisible');
            theName.innerText = 'An exception has met, please log out and re-login';
            theName.className = 'text-red-700';
        }
    } else {
        userManager.classList.toggle('invisible');
        theName.innerText = 'You ruined it!';
    }

    
}

function toggleLoginPopup() {
    const whole = document.getElementById('loginSystem')
    whole.classList.toggle('invisible');
    
};

function randomInvites() {
    const main = document.getElementById('theInvites')

    main.innerText = Math.floor(Math.random() * 69) + " invites remaining"
};

function validateLogin() {
    const thePopup = document.getElementById('infoReportAAAAAA');
    const rememberLogin = document.getElementById('rememberLogin')

    var usernameInput = document.getElementById('shitFromUser').value;
    var passwordInput = document.getElementById('passwordFromUser').value;

    if (usernameInput == '' || passwordInput == '' ) {
        thePopup.className = ('text-red-700 text-xs')
        thePopup.innerText = 'Missing username/password, try again'
        setTimeout(() => {
            thePopup.innerText = ''
        }, 5000);
    } else {
        thePopup.classList = ('text-green-700 text-xs')
        thePopup.innerText = 'Logged in, please wait!'
        if (rememberLogin.checked) {
            document.location.href = './index.html'
            localStorage.setItem('loginStatus', 'true')
            sessionStorage.setItem('loginStatus', 'false')
            localStorage.setItem('username', usernameInput)
            localStorage.setItem('password', passwordInput)
        } else {
            document.location.href = './index.html'
            sessionStorage.setItem('loginStatus', 'true')
            localStorage.setItem('loginStatus', 'false')
            sessionStorage.setItem('username', usernameInput)
            sessionStorage.setItem('password', passwordInput)
        };
        
        
    };
};


function loginKey(event) {
    if (event.key === 'Enter') {
            event.preventDefault();
            validateLogin();
    };
};






function userTokenLogout() { // Simple reset all of the set storage, as a way to counter 2-true loginStatus
    const whole2 = document.getElementById('userIDStats')
        localStorage.setItem('loginStatus', 'false')
        localStorage.setItem('username', '')
        localStorage.setItem('password', '')
        sessionStorage.setItem('loginStatus', 'false')
        sessionStorage.setItem('username', '')
        sessionStorage.setItem('password', '')
        alert('Logged out!');
        whole2.classList.toggle('invisible');
    window.location.href = './login.html'
};

function plagueUser() { // Feature where April Fool would be absolutely fucking fun to troll

}

function toggleSignupWindow () {
    const popUp = document.getElementById('signupSystem');
    popUp.classList.toggle('invisible');
}

