var authorize_url = 'https://accounts.spotify.com/authorize';
var client_id = '14cb090ba71b43d0b93e3f22d67eb211';
var client_secret = 'de82df11441248d5bef3f00e9c1a9689';
var redirect_uri = "chrome-extension://mokfeheicjhjkjfcccbojjiankehpeaa/settings/index.html#";
var scope = "playlist-read-private playlist-modify-public playlist-modify-private user-read-email";
var search_url = 'https://api.spotify.com/v1/search';
var playlist_url = 'https://api.spotify.com/v1/me/playlists';
var user_url = 'https://api.spotify.com/v1/me';


// Message and button containers
var lout = $("#spotify_helper_logout");
var lin = $("#spotify_helper_login");
var search = $("#spotify_helper_search");
var playlist_box = $('#playlist_box');
var results_div = $('#results_div');



function init() {



    // Log in button
    $("#spotify_helper_login").click(function () {
        getAuthorizationCode();

    });

    // Log out button
    $("#spotify_helper_logout").click(function () {
        $(lin).show();
        $(lout).hide();
        $(search).hide();
        localStorage.clear();
        console.log("logged out");
    });


    if (localStorage.getItem('AuthorizationCode') == 'null') {
        $(lin).show();
        $(lout).hide();
        $(search).hide();

    } else {

        $(lin).hide();
        $(lout).show();
        $(search).show();

        document.getElementById('spotify_search_form').addEventListener('submit', function(evt){
            evt.preventDefault();
            searchTrack(document.getElementById('query').value)
        })
    }
}

function updateUI() {

    //chrome.storage.sync.set({'code': getParameterByName('code',xhr.responseURL)}, function() {
    document.getElementById('spotify_search_form').addEventListener('submit', function(evt){
        evt.preventDefault();
        searchTrack(document.getElementById('query').value)
    });

    $(lin).hide();
    $(lout).show();
    $(search).show();
}

function updateUIWithPlaylists() {

    playlists = JSON.parse(localStorage.getItem('playlists'))
    for (i = 0; i < playlists.length; i++) {
        console.log(playlists[i]['playlist_name'])
        $('<li><button class="playlistBtn">'+ playlists[i]['playlist_name']+'</button></li>').appendTo('#PlaylistList')
            .find('.playlistBtn')
            .data('id', playlists[i]['playlist_id'])
            .click(function(e) {
                addToPlaylist($(this).data('id'));
            });
    }
    $(playlist_box).show();


}

function getAuthorizationCode() {

    var xhr;
    var _orgAjax = jQuery.ajaxSettings.xhr;
    jQuery.ajaxSettings.xhr = function () {
        xhr = _orgAjax();
        return xhr;
    };

    jQuery.ajax({

        type:'GET',
        url:authorize_url,
        data:{
            "client_id": client_id,
            "response_type":"code",
            "redirect_uri": redirect_uri,
            "scope": scope
        },

        success: function(response) {

            // Save it using the Chrome extension storage API.
            var code = getParameterByName('code',xhr.responseURL);
            localStorage.setItem('AuthorizationCode', code);
            console.log('AuthorizationCode:', code);
            getAccessToken();


        }
    });
}

function getAccessToken(){

    jQuery.ajax({
        type:'POST',
        url:'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' +  btoa(client_id + ":" + client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        data:{
            "grant_type": 'authorization_code',
            "code":localStorage.getItem('AuthorizationCode'),
            "redirect_uri":redirect_uri
        },

        success: function(responseText) {
            localStorage.setItem('access_token', responseText['access_token']);
            console.log('Access token:',  responseText['access_token']);
            updateUI();
            getUserDetails();
            getPlaylists();
        }

    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function searchTrack(query) {

    jQuery.ajax({

        type:'GET',
        async: false,
        url: search_url,
        headers:{
            'Authorization':"Bearer "+localStorage.getItem('access_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        data:{

            'q':query,
            'type':'track'
        },

        success: function(responseText) {
            console.log(responseText);
            track_0 = responseText['tracks']['items'][0];
            document.getElementById('results_div').innerHTML="<h4>"+track_0['name']+"</h4>";
            $(results_div).show()
            localStorage.setItem("track_uri", track_0['uri']);
            updateUIWithPlaylists();
        }

    });
}

function getUserDetails() {

    jQuery.ajax({

        type:'GET',
        url: user_url,
        async: false,
        headers:{
            'Authorization':"Bearer "+localStorage.getItem('access_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        success: function(responseText) {

            console.log(responseText);
            localStorage.setItem('user_name', responseText['display_name']);
            localStorage.setItem('user_id', responseText['id']);
        }

    });

}

function getPlaylists() {

    jQuery.ajax({

        type:'GET',
        url: playlist_url,
        headers:{
            'Authorization':"Bearer "+localStorage.getItem('access_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        success: function(responseText) {

            console.log(responseText);

            var playlists = [];

            responseText.items.forEach(function(playlist, index) {

                playlists.push({
                    playlist_id: playlist['id'],
                    playlist_name: playlist['name']
                });

            });

            localStorage.setItem('playlists', JSON.stringify(playlists));
        }

    });

}

function addToPlaylist(playlist_id) {

    url = "https://api.spotify.com/v1/users/"+localStorage.getItem('user_id')+'/playlists/'+playlist_id+'/tracks';

    jQuery.ajax({

        type:'POST',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers:{
            'Authorization':"Bearer "+localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
        },

        data:JSON.stringify({'uris':[localStorage.getItem('track_uri')]}),

        success: function(responseText) {
            console.log(responseText);
            alert(responseText);
        }

    });
}


$(document).ready(init);
