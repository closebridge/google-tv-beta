const loginBanner = document.getElementById('loginRequired')

document.onload = checkIfLogon;



function checkIfLogon() {
    if (!localStorage.getItem('loginStatus')) {
        window.location.href = "./login.html";
        document.onload = loginBanner.innerText = 'Please login to use the "service", thanks for understanding';
    };
};

function callLoginPopup() {
    const userManager = document.getElementById('userIDStats');
    const theName = document.getElementById('userToken');
    
    if (localStorage.loginStatus == 'true') {
        userManager.classList.toggle('invisible');
        theName.innerText = 'Hey, ' + localStorage.getItem('username') + '!';
    } else if (sessionStorage.loginStatus == 'true' ) {
        userManager.classList.toggle('invisible');
        theName.innerText = 'Hey, ' + sessionStorage.getItem('username') + '!';
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
}

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

        if (!rememberLogin.checked) {
            document.location.href = './index.html'
            sessionStorage.setItem('loginStatus', 'true')
            sessionStorage.setItem('username', usernameInput)
            sessionStorage.setItem('password', passwordInput)
        } else {
            document.location.href = './index.html'
            localStorage.setItem('loginStatus', 'true')
            localStorage.setItem('username', usernameInput)
            localStorage.setItem('password', passwordInput)
        };
        
        
    }
}


function loginKey(event) {
    if (event.key === 'Enter') {
            event.preventDefault();
            validateLogin();
    };
};






function userTokenLogout() {
    const whole2 = document.getElementById('userIDStats')
    localStorage.setItem('loginStatus', 'false')
    localStorage.setItem('username', '')
    localStorage.setItem('password', '')
    alert('Logged out!');
    whole2.classList.toggle('invisible');
    window.location.href = './login.html'
};

function plagueUser() { // Feature where April Fool would be absolutely fucking fun to do

}

function toggleSignupWindow () {
    const popUp = document.getElementById('signupSystem');
    popUp.classList.toggle('invisible');
}

