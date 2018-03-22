var song_detect_icon_path = "icons/AddToSpotifyPlaylist/p_16x16.png";
var regular_icon_path = "icons/AddToSpotifyPlaylist/16x16.png";
var source_youTube = "- YouTube";


chrome.tabs.onActivated.addListener(function(activeInfo) {

    chrome.tabs.get(activeInfo.tabId, parsePage);

});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    var title = changeInfo.title;
    if (title !== undefined) {
        chrome.tabs.get(tabId, parsePage);
    }

});

function parsePage(tab) {

    var title  = tab.title;

    if(title.indexOf(source_youTube) !== -1){

        title = title.replace(source_youTube, "");
        chrome.browserAction.setIcon({path: {16: song_detect_icon_path}});
        localStorage.setItem("title_detected", title);
    }

    else{

        chrome.browserAction.setIcon({path: {16: regular_icon_path}});

    }
}