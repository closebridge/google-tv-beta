const apikey = 'AIzaSyDT_Lp_UjSQd6NVDQ55KWBZBD7VR2DPu78';


function search() {
    const maxResults = 20;
    const searchInput = document.getElementById('searchbox').value;
    const searchThis = encodeURIComponent(searchInput);
    searchResultsList.innerHTML = '';
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&type=video&q=${searchThis}"&maxResults=${maxResults}`)
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
        titleButton.className = 'bg-gray-200 text-start hover:bg-gray-300 w-auto';
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
        console.error('"thumbnailhere" cant be found');
    }
}



//Channel functions

function loadYoutube() {
    console.log('Uhh so I am still trying to make it work without framework (also with my limited skill) ')
}
