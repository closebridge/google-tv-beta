const apikey = 'AIzaSyDT_Lp_UjSQd6NVDQ55KWBZBD7VR2DPu78';


function search() {
    const maxResults = 35;
    const searchInput = document.getElementById('searchbox').value;
    const searchThis = encodeURIComponent(searchInput);
    searchResultsList.innerHTML = '';
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&chart=mostPopular&regionCode=VN&part=snippet&type=video&q=${searchThis}&maxResults=${maxResults}`) //youtube stop being a bitch for removing rel=0, grrrr...
        .then(response => response.json())
        .then(data => displaySearchResults(data.items))
        .catch(error => console.error('Error fetching data:', error));
}

function enterDown(event) {
    if (event.key === 'Enter') {
            event.preventDefault();
            search();
    }
}




function displaySearchResults(results) {
    const list1 = document.getElementById('list1');
    list1.innerHTML = '';

    results.forEach(video => {
        const videoTitle = video.snippet.title;
        const videoId = video.id.videoId;

        const listItem = document.createElement('li');
        listItem.textContent = videoTitle;
        list1.appendChild(listItem);
    });
}


function displaySearchResults(results) {
    const searchResultsList = document.getElementById('searchResultsList');

    results.forEach(video => {
        const videoTitle = video.snippet.title;
        const videoId = video.id.videoId;
        const listItem = document.createElement('li');

        //Button (tailwind already in)
        const titleButton = document.createElement('button');
        titleButton.textContent = videoTitle;
        titleButton.className = 'bg-gray-200 text-start text-sm hover:bg-gray-300 active:bg-gray-400 w-auto';
        titleButton.addEventListener('click', () => playVideo(videoId));
        
        //Add components
        listItem.appendChild(titleButton);
        searchResultsList.appendChild(listItem);
    });
}

function playVideo(videoId) {
    console.log('loading current id:', videoId);
}


function playVideo(videoId) {
    const videoplaybackDiv = document.getElementById('videoplayback');
    videoplaybackDiv.innerHTML = '';

    // iframe lies here
    const iframe = document.createElement('iframe');
    iframe.width = '640'; //Size W 
    iframe.height = '360'; //Size H
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allowFullscreen = true;
    videoplaybackDiv.appendChild(iframe);

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
        console.error("Something gone wrong, and I can't help you with that. So here's the ID that you might need:", videoId);
    }
}



//Channel functions
//Copy and paste wall ahead 😢

function loadYoutube() {
    //console.log('Uhh so I am still trying to make it work without framework (also with my limited skill) ')
    const youtubeImagey = 'https://media.discordapp.net/attachments/1030086749910749224/1174344762896171109/502px-Logo_of_YouTube_282015-201729.png';
    const mainui = {
        searchResultsList: document.getElementById('searchResultsList'),
        videoplayback: document.getElementById('videoplayback'),
        thumbnailhere: document.getElementById('thumbnailhere'),
        searchtext: document.getElementById('searchtext'),
        youtubeElement: document.createElement('img'),
    }
    
    mainui.youtubeElement.src = youtubeImagey;

    mainui.searchResultsList.innerHTML='';
    mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.youtubeElement);
    mainui.searchtext.textContent= 'Results from YouTube';
    search()

}

function loadVTV() {
    const vtvImagey = 'https://media.discordapp.net/attachments/1030086749910749224/1177616036565106738/vtvcover.png';
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
    mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.VTVElement);
    mainui.searchtext.textContent= 'Results from VTV';
    
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&maxResults=${maxResults}&channelId=${vtvID}`) //youtube stop being a bitch for removing rel=0, grrrr...
        .then(response => response.json())
        .then(data => displaySearchResults(data.items))
        .catch(error => console.error('Error fetching data:', error));
}

function loadVTC() {
    const vtcImagey = 'https://media.discordapp.net/attachments/1030086749910749224/1177622005344915466/vtc.png';
    const vtcID = 'UCL9-pEHNBs3N4r2bMoXdLJA';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${vtcID}&type=video&maxResults=50&key=${apikey}`;
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
    mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    mainui.thumbnailhere.appendChild(mainui.VTCElement);
    mainui.searchtext.textContent= 'Results from VTC';
    
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&maxResults=${maxResults}&channelId=${vtcID}`) //youtube stop being a bitch for removing rel=0, grrrr...
        .then(response => response.json())
        .then(data => displaySearchResults(data.items))
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
    mainui.videoplayback.innerHTML='';
    mainui.thumbnailhere.innerHTML='';
    youtubeElement: document.createElement('img'),
    mainui.searchtext.textContent= 'Not available/Chưa phát triển 🥹😥';
}