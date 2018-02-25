function init() {

    // Message and button containers
    var lout = $("#trello_helper_logout");
    var lin = $("#trello_helper_login");

    function getParameterByName(name, url) {
          if (!url) url = window.location.href;
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
      }

    // Log in button
    $("#trello_helper_login").click(function () {
      console.log("in login");

      var xhr;
      var _orgAjax = jQuery.ajaxSettings.xhr;
      jQuery.ajaxSettings.xhr = function () {
        xhr = _orgAjax();
        return xhr;
      };

      jQuery.ajax({
        type:'GET',
         url:'https://accounts.spotify.com/authorize',
         data:{
          "client_id": '14cb090ba71b43d0b93e3f22d67eb211',
          "response_type":"code",
          "redirect_uri":"chrome-extension://mokfeheicjhjkjfcccbojjiankehpeaa/settings/index.html#",
          "scope": "playlist-read-private playlist-modify-public playlist-modify-private user-read-email"
        },
        success: function(responseText) {
          console.log('code:', getParameterByName('code',xhr.responseURL));

          // Save it using the Chrome extension storage API.
          localStorage.setItem('code', getParameterByName('code',xhr.responseURL));
          //chrome.storage.sync.set({'code': getParameterByName('code',xhr.responseURL)}, function() {
            // Notify that we saved.
            console.log('code saved');
          }
        });
      });

    // Log out button
    $("#trello_helper_logout").click(function () {
      console.log("in trello_helper_logout");
    });


    //if (!chrome.storage.sync.get('code')) {
    if (!localStorage.getItem('code')) {
        $(lin).show();
        $(lout).hide();
    } else {
      console.log(localStorage.getItem('code'));
        $(lin).hide();
        $(lout).show();
    }
    
$(document).ready(init);
