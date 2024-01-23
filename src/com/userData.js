
// Everything inside is still pretty much a concept, and PROBALLY would never see the light
// I'm simply taking a long piss trying to make nice thing
// Thank you for understanding!



const playbackScreen = document.getElementById('videoplayback')
const ThumbnailImage = document.getElementById('thumbnailhere')
const searchResultsList = document.getElementById('searchResultsList')
var fetchWatchedVideo = JSON.parse(localStorage.getItem("watchedVideo"));


if (fetchWatchedVideo) {
    //console.log(fetchWatchedVideo);
} else {
    console.warn('No history detected within localStorage')
};

function fetchFromStorage() {


};

function historyVideo() {
    document.getElementById('searchtext').innerText = 'Last Viewed';
    searchResultsList.innerHTML = '';

};

function removeHistory() {
    localStorage.removeItem('watchedVideo');
    alert('History clearred')
};