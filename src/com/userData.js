
// Everything inside is still pretty much a concept, and PROBALLY would never see the light
// I'm simply taking a long piss trying to make nice thing
// Thank you for understanding!


const playbackScreen = document.getElementById('videoplayback')
const ThumbnailImage = document.getElementById('thumbnailhere')
const searchResultsList = document.getElementById('searchResultsList')


if (!localStorage.getItem('watchedVideo')) {
    localStorage.setItem('watchedVideo', null);
};

var oldCountedURL = 0
function fetchFromStorage() {
    var oldURL = JSON.parse(localStorage.getItem("watchedVideo"))
    const searchDisplay = document.getElementById('searchResultsList')
    document.getElementById('searchtext').textContent = 'Last Viewed'
    
    const resultTitle = document.getElementById('list1')
    var countedURL = 0

    try {
        countedURL = JSON.parse(localStorage.getItem('watchedVideo')).length
        if (countedURL !== 0) {
            joinedURL = oldURL.join(',')
        }
    } catch (error) {
        alert("Nothing within Recently Watched")
        return
    }
    

    
    if (countedURL == oldCountedURL) { // Memorization
        return
    } else {
        searchDisplay.innerHTML = ''
    }

    if (countedURL > 0 || localStorage.getItem('watchedVideo') !== '') {
        fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apikey}&part=snippet&id=${joinedURL}&maxResults=${countedURL}`)
        .then(response => response.json())
        .then(data => { // Display it
            // var oldURL = JSON.parse(localStorage.getItem("watchedVideo"))
            data.items.forEach((item) => {

                historyTitle = item.snippet.title;
                let historyId = item.id;
                const listItem = document.createElement('li');
                const buttonForItem = document.createElement('button');
                buttonForItem.textContent = historyTitle;
                buttonForItem.className = 'bg-gray-200 text-start text-sm hover:bg-gray-300 active:bg-gray-400 w-auto';
                buttonForItem.addEventListener('click', () => playVideo(historyId, true));
                listItem.appendChild(buttonForItem);
                searchDisplay.appendChild(listItem);
                oldCountedURL = countedURL
            })
        })
        .catch(error => {
            console.error("Unable to fetch() ", error)
        })
            
    } // else {console.log("woopie oopsii mwe forgor to wawch anythigg > ~ <") (Stupid fucks, wont use it)};
    // console.log('counter=', countedURL, 'oldcounter=', oldCountedURL)
};

function historyVideo() {
    document.getElementById('searchtext').innerText = 'Last Viewed';
    searchResultsList.innerHTML = '';

};


function removeHistory() {
    try {
        var toRemove = JSON.parse(localStorage.getItem('watchedVideo')) || [];
        toRemove = [null]
        localStorage.setItem('watchedVideo', JSON.stringify(toRemove))
        oldURL = []
        let countedURL = 0
        localStorage.setItem('watchedVideo', '');
        alert('History clearred')
    } catch (error) {
        alert('Unable to remove data, perhaps the history is empty?', error)
    }
};
