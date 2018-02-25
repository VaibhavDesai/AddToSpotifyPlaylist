
function click(e){
  chrome.tabs.query({currentWindow:true, active: true}, function(tabs){
    if(!localStorage.code){
      console.log("not loggedin");
    }
    else{
      console.log("loggedIn");
      
    }
      console.log("background is clicked");
  });
}

chrome.browserAction.onClicked.addListener(click);
