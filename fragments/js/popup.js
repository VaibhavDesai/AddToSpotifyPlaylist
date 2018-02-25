// Message and button containers
var lout = $("#spotify_helper_logout");
var lin = $("#spotify_helper_login");
var search = $("#spotify_helper_search");
var playlist_box = $('#playlist_box');
var results_div = $('#results_div');

document.write('<script src="js/apiTokens.js" type="text/javascript"></script>');
document.write('<script src="js/spotifyEndpoints.js" type="text/javascript"></script>');
document.write('<script src="js/updateUI.js" type="text/javascript"></script>');
document.write('<script src="js/utils.js" type="text/javascript"></script>');
document.write('<script src="../scripts/keys.js" type="text/javascript"></script>');
document.write('<script src="../scripts/urls.js" type="text/javascript"></script>');

function init() {



    // Log in button
    console.log('AuthorizationCode:', localStorage.getItem("AuthorizationCode"));
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

$(document).ready(init);
