window.location = chrome.extension.getURL('lib/chrome-ex-auth/oauth2.html') + window.location.href.substring(window.location.href.indexOf('?'));

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing
           the web-pages DOM content as argument */
        console.log("clikced");
        sendResponse(document.getElementById("mybutton").innerHTML);
    }
});