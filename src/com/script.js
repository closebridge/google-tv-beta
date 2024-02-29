const prodToken = 'AIzaSyDT_Lp_UjSQd6NVDQ55KWBZBD7VR2DPu78'; //Never change
var apikey = 'AIzaSyDT_Lp_UjSQd6NVDQ55KWBZBD7VR2DPu78'; // ALWAYS CHECK APIKEY BEFORE SEND TO PRODUCTION!!!!!!!!!! PAST/FUTURE SELF!
const cache = {};
const maxResults = '35';
// Anyways welcome to boilerplate hell
var historyVideo = []
var watchedVideo = [] 

// Cooldown
let lastSearchTime = 0;
const cooldownTime = 3000;
const currentTime = Date.now();


function debugOnly() {
    const backupID = document.getElementById('backupAPI')
    const userToken = document.getElementById('userAPI')
    const showId = document.getElementById('tokenIdPlace');

    if (backupID.checked == true || (userToken)) {
        showId.innerHTML ='';
        showId.innerHTML ='Token: ' + `${apikey}` + ' (BACKUP API IN USE)';
    } else if (userToken == '' || userToken == null) {
        showId.innerHTML ='';
        showId.innerHTML ='Token: ' + `${apikey}` + ' (Prod token)';
    }
    
}

let lastExecutionTime = 0;
const cooldownDuration = 2000; 

//Search condition checkbox


function search() {
  let currentTime = Date.now();

  // Check if the cooldown period has elapsed
  if (currentTime - lastExecutionTime <= cooldownDuration) {
    console.log("Search on cooldown");
    cooldownThing();
    return;
  }

  const searchInput = document.getElementById('searchbox').value;
  const searchThis = encodeURIComponent(searchInput);
  const cacheKey = `search_${searchThis}`;
  const searchtext = document.getElementById('searchtext');

  if (cache[cacheKey]) {
    displaySearchResults(cache[cacheKey]);
    return;
  }
  const searchResultsList = document.getElementById('searchResultsList')
  searchResultsList.innerHTML = '';
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&chart=mostPopular&regionCode=US&part=snippet&type=video&q=${searchThis}&maxResults=${maxResults}`)
  .then(response => {
    if (!response.ok) {
        if (response.status === 400) {
            alert('error')
        } else {
            //tokenToggle();
        }
    }
    return response.json();
})
    .then(data => {
      // Cache
      cache[cacheKey] = data.items;
      displaySearchResults(data.items);
    })
    .catch(error => console.error('Error fetching data:', error));



  searchtext.innerHTML = '';
  searchtext.textContent = 'Results from YouTube';
  lastExecutionTime = currentTime;
}


function displaySearchResults(results) {
    const list1 = document.getElementById('list1');
    list1.innerHTML = '';

    results.forEach(video => {
        const videoTitle = video.snippet.title;
        var videoId = video.id.videoId;

        const listItem = document.createElement('li');
        listItem.textContent = videoTitle;
        list1.appendChild(listItem);
    });
}

function enterDown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        search();
    }
}


function displaySearchResults(results) {
    const searchResultsList = document.getElementById('searchResultsList');

    if (results && Array.isArray(results)) {
        results.forEach(video => {
            const videoTitle = video.snippet.title;
            const videoId = video.id.videoId;
            const listItem = document.createElement('li');
            

            // Button (tailwind already in)
            const titleButton = document.createElement('button');
            titleButton.textContent = videoTitle;
            titleButton.className = 'bg-gray-200 text-start text-sm hover:bg-gray-300 active:bg-gray-400 w-auto';
            titleButton.addEventListener('click', () => playVideo(videoId));
            listItem.appendChild(titleButton);
            searchResultsList.appendChild(listItem);
        });
    } else {
        //console.error('Invalid or undefined results:', results);
        tokenToggle();
    }
}


function playVideo(videoId) {
    const videoplaybackDiv = document.getElementById('videoplayback');
    videoplaybackDiv.innerHTML = '';

    // iframe lies here
    const iframe = document.createElement('iframe');
    iframe.width = '660'; //Size W 
    iframe.height = '380'; //Size H
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allowFullscreen = true;
    videoplaybackDiv.appendChild(iframe);

    var newVideoId = videoId;
    watchedVideo.push(newVideoId);
    localStorage.setItem("watchedVideo", JSON.stringify(watchedVideo));
    
    //Thumbnail
    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    thumbnailImg.alt = 'Thumbnail';
    thumbnailImg.style.width = '15rem';
    thumbnailImg.style.height = '8rem';
    const displayThumbnail = document.getElementById('thumbnailhere');

    //Simple check
    displayThumbnail.innerHTML = '';
    if (displayThumbnail) {
        displayThumbnail.appendChild(thumbnailImg);
    } else {
        //console.error("Something gone wrong, and I can't help you with that. So here's the ID that you might need:", videoId);
    }
}



//Channel functions
//Copy and paste wall ahead 😢

function loadYoutube() {
    //console.log('Uhh so I am still trying to make it work without framework (also with my limited skill) ')
    const youtubeImagey = './com/photos/youtube.png';
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
        youtubeElement: document.createElement('img'),
    }
    
    mainui.youtubeElement.src = youtubeImagey;

    mainui.searchResultsList.innerHTML='';
    //mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.youtubeElement);
    mainui.searchtext.textContent= 'Results from YouTube';
    search()

}

function loadVTV() {
    const vtvImagey = './com/photos/vtvcover.png';
    const vtvID = 'UCabsTV34JwALXKGMqHpvUiA';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${vtvID}&type=video&maxResults=50&key=${apikey}`;
    const maxResults = '35';
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
        VTVElement: document.createElement('img'),
    }
    
    mainui.VTVElement.src = vtvImagey;

    mainui.searchResultsList.innerHTML='';
    //mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.VTVElement);
    mainui.searchtext.textContent= 'Results from VTV';
    const cacheKey = `search_${vtvID}`;

    if (cache[cacheKey]) {
        displaySearchResults(cache[cacheKey]);
        return;
    }

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&maxResults=${maxResults}&channelId=${vtvID}`) //youtube stop being a bitch for removing rel=0, grrrr...
        .then(response => response.json())
        .then(data => {
            // Cache
            cache[cacheKey] = data.items;
            displaySearchResults(data.items);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function loadVTC() {
    const vtcImagey = './com/photos/vtccover.png';
    const vtcID = 'UCL9-pEHNBs3N4r2bMoXdLJA';
    const maxResults = '35';
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
        VTCElement: document.createElement('img'),
    }
    
    mainui.VTCElement.src = vtcImagey;

    mainui.searchResultsList.innerHTML='';
    //mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.VTCElement);
    mainui.searchtext.textContent= 'Results from VTC';
    const cacheKey = `search_${vtcID}`;

    if (cache[cacheKey]) {
        displaySearchResults(cache[cacheKey]);
        return;
    }
    
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&maxResults=${maxResults}&channelId=${vtcID}`) //youtube stop being a bitch for removing rel=0, grrrr...
        .then(response => response.json())
        .then(data => {
            // Cache
            cache[cacheKey] = data.items;
            displaySearchResults(data.items);
        })
        .catch(error => console.error('Error fetching data:', error));
}


function loadHolder() {
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
    }
    mainui.searchResultsList.innerHTML='';
    //mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    youtubeElement: document.createElement('img'),
    mainui.searchtext.textContent= 'Not available/Chưa phát triển 🥹😥';
}

//Second picker codebase (pending)
const stillWoozyId = 'UCFvpiAtMwvCTCZuEM8Ua8Uw';
const joyrydeId = 'UCLddKRSsA2eNfwnNVz6Onrg';
    //habstrakt is not here (no channel, just reuploads)
const nicklengId = 'UCoouBWARCpal3ctBF87Pqsg';
const antohaMCId = 'UC8azRZKZlDI5KVX2Un6HFmQ';
const knock2Id = 'UCdb3pfoDoMOl-oMS1Ldsmiw';

const theStillWoozy = './com/photos/StillWoozy.png';
const theHabstrakt = './com/photos/habstrakt.png';
const theJOYRYDE = './com/photos/JOYRYDE.png';
const theNickLeng = './com/photos/nickleng.png';
const theAntohaMC = './com/photos/antohamc.png';
const theKnock2 = './com/photos/knock2down.png'

    
function stillWoozy() {
    
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
        theElement: document.createElement('img'),
    }   

    mainui.theElement.src = theStillWoozy;
    mainui.searchResultsList.innerHTML='';
    //mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.theElement);
    mainui.searchtext.textContent= 'Still Woozy';
    mainui.searchtext.classList= '-mt-2'

    const cacheKey = `search_${stillWoozyId}`;

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&maxResults=${maxResults}&channelId=${stillWoozyId}`)
    .then(response => response.json())
    .then(data => {
        // Cache
        cache[cacheKey] = data.items;
        displaySearchResults(data.items);
    })
    .catch(error => console.error('Error fetching data:', error));    
}

function knock2() {
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
        theElement: document.createElement('img'),
    }   

    mainui.theElement.src = theKnock2;
    mainui.searchResultsList.innerHTML='';
    //mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.theElement);
    mainui.searchtext.textContent= 'Knock2';
    mainui.searchtext.classList= '-mt-1'

    const cacheKey = `search_${knock2Id}`;

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&maxResults=${maxResults}&channelId=${knock2Id}`)
    .then(response => response.json())
    .then(data => {
        // Cache
        cache[cacheKey] = data.items;
        displaySearchResults(data.items);
    })
    .catch(error => console.error('Error fetching data:', error));   
}

function joyryde() {
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
        theElement: document.createElement('img'),
    }   

    mainui.theElement.src = theJOYRYDE;
    mainui.searchResultsList.innerHTML='';
    //mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.theElement);
    mainui.searchtext.textContent= 'JOYRYDE';
    mainui.searchtext.classList= 'mt-2'

    const cacheKey = `search_${joyrydeId}`;

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&maxResults=${maxResults}&channelId=${joyrydeId}`)
    .then(response => response.json())
    .then(data => {
        // Cache
        cache[cacheKey] = data.items;
        displaySearchResults(data.items);
    })
    .catch(error => console.error('Error fetching data:', error));   
}

function habstrakt() {
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
        theElement: document.createElement('img'),
    }   

    mainui.theElement.src = theHabstrakt;
    mainui.searchResultsList.innerHTML='';
    //mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.theElement);
    mainui.searchtext.textContent= 'Habstrakt';
    mainui.searchtext.classList= 'mt-2'

    
    const cacheKey = `search_${habstrakt}`;
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&maxResults=${maxResults}&q='habstrakt'`)
    .then(response => response.json())
    .then(data => {
        // Cache
        cache[cacheKey] = data.items;
        displaySearchResults(data.items);
    })
    .catch(error => console.error('Error fetching data:', error));   
}

function nickleng() {
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
        theElement: document.createElement('img'),
    }   

    mainui.theElement.src = theNickLeng;
    mainui.searchResultsList.innerHTML='';
    //mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.theElement);
    mainui.searchtext.textContent= 'Nick Leng';
    mainui.searchtext.classList= '-mt-1'

    const cacheKey = `search_${nicklengId}`;

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&maxResults=${maxResults}&channelId=${nicklengId}`)
    .then(response => response.json())
    .then(data => {
        // Cache
        cache[cacheKey] = data.items;
        displaySearchResults(data.items);
    })
    .catch(error => console.error('Error fetching data:', error));   
}

function antohamc() {
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
        theElement: document.createElement('img'),
    }   

    mainui.theElement.src = theAntohaMC;
    mainui.searchResultsList.innerHTML='';
    ////mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.theElement);
    mainui.searchtext.textContent= 'Antoha MC';

    const cacheKey = `search_${antohaMCId}`;

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&maxResults=${maxResults}&channelId=${antohaMCId}`)
    .then(response => response.json())
    .then(data => {
        // Cache
        cache[cacheKey] = data.items;
        displaySearchResults(data.items);
    })
    .catch(error => console.error('Error fetching data:', error));   
};

// Hide pop up if pressed
function loginPopupListener() {
    document.addEventListener('click', function (event) {
        const loginSystem = document.getElementById('loginSystem');
        if (!loginSystem.contains(event.target)) {
            loginSystem.classList.add('invisible');
        }
    });
}


// Advance search
function advanceSearchWindow() { 
    const popup = document.getElementById('advanceSearch');
    document.body.classList.toggle('blurred');
    popup.classList.toggle('invisible');
    document.getElementById('advanceSearch').addEventListener('click', function (event) {
        if (event.target === this) {
            advanceSearchWindow();
        }
    });
}

//Horizontal viewport function
document.addEventListener('DOMContentLoaded', function() {
    function smallscreenPopUp() {
        const thePopUp = document.getElementById('smallScreenPopUp');
        thePopUp.classList.toggle('invisible');
    }
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //console.log('Ayo mobile user');
        smallscreenPopUp();
    }
});

function smallScreenPopUpRemove() {
    const smallScreen = document.getElementById('smallScreen');
    smallScreen.innerHTML = '';
}



// GitHub commit/Changelog
async function changeLogs() {
    const ghName = 'closebridge';
    const ghRepo = 'google-tv-beta';
    const ghURL = `https://api.github.com/repos/${ghName}/${ghRepo}/commits`;
    const changelogList = document.getElementById('changelogPlace');

    try {
        const response = await fetch(ghURL);
        const userData = await response.json();
        changelogList.classList.toggle = 'scale-75';
        
        if (response.ok) {
            const ghRepoNotes = userData.map(commits => `
                <div>
                    <a href="https://github.com/${ghName}/${ghRepo}/commits" target="_blank">
                        <p  class="text-blue-600 font-mono">${commits.sha.slice(0, 7)}</p>
                    </a>
                    <p class="text-sm w-64 italic text-green-700">${commits.commit.message}</p>
                    <p class="italic">Blame to ${commits.commit.author.name}</p>
                </div>
            `).join('');
            changelogList.innerHTML = '';
            changelogList.innerHTML = ghRepoNotes;
        } else {
            console.warn('Bro, something is off...');
        }
    } catch (error) {
        console.error('Wait what...?', error);
    }
    
}


//Cute face fetch

function randomCuteFace() {
    const cuteFace = document.getElementById('cuteStuff');

    fetch('theUwUs.txt')
    .then(response => response.text())
    .then(data => {
        const texts = data.split('\n').filter(text => text.trim() !== '');
        const randomText = texts[Math.floor(Math.random() * texts.length)]; //Don't know how, but math.random for life!
        cuteFace.innerHTML = randomText;
    })
    .catch(error => {
        console.error('No cuteness...', error);
    });
}


//Cooldown Popup
let canAppear = true;
function cooldownThing() {

    if (canAppear) {
        const cooldownWindow = document.getElementById('cooldownPopup');
        cooldownWindow.classList.toggle('invisible');
        canAppear = false;

        setTimeout(() => {
            canAppear = true;
        }, 1000);
    } else {
        console.log('canAppear is inside of me owo /s /j');
    }

}


//No API stealing, that's piracy (jk)
function loopBack() {
    console.log("No API Token thief!!!, I already restricted the key to this website ONLY!")
    setTimeout(loopBack, 10000);
}


function tokenToggle() {
    const tokenSelector = document.getElementById('tokenSelector');
    tokenSelector.classList.toggle('invisible')
};

function tokenConfirmation() {

    const bkToken = document.getElementById('backupAPI');
    const userToken = document.getElementById('userAPI').value;

    if (bkToken.checked) {
        apikey = 'AIzaSyDT_Lp_UjSQd6NVDQ55KWBZBD7VR2DPu78';
        tokenToggle();
    } else if (userToken) {
        apikey = userToken;
        tokenToggle();
    } else {
        apikey = prodToken;
        tokenToggle();
    };
};


