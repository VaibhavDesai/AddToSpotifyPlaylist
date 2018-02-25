// Message and button containers
var search = $("#spotify_helper_search");
var playlist_box = $('#playlist_box');
var results_div = $('#results_div');

document.write('<script src="js/apiTokens.js" type="text/javascript"></script>');
document.write('<script src="js/spotifyEndpoints.js" type="text/javascript"></script>');
document.write('<script src="js/updateUI.js" type="text/javascript"></script>');
document.write('<script src="js/utils.js" type="text/javascript"></script>');
document.write('<script src="../scripts/keys.js" type="text/javascript"></script>');
document.write('<script src="../scripts/urls.js" type="text/javascript"></script>');
document.write('<script src="../lib/buttonAnimation.js" type="text/javascript"></script>');

var animating = false,
    submitPhase1 = 1100,
    submitPhase2 = 400,
    logoutPhase1 = 800,
    $login = $(".login"),
    $app = $(".app");

function init() {

    logoutListener();
    loginListener();

    AuthorizationCode = localStorage.getItem("AuthorizationCode");
    if (localStorage.getItem('AuthorizationCode') == null) {
        //console.log("AuthorizationCode is", AuthorizationCode);

    } else {
        //console.log("AuthorizationCode is", AuthorizationCode);
        loadupScreen();

    }

    $(document).on("click", ".search-button", function(evt) {
        console.log("here in ");
        evt.preventDefault();
        searchTrack(document.getElementById('query').value);
    });

}

function loadupScreen() {

    $app.show();
    $app.css("top");
    $app.addClass("active");
    $login.hide();
    $login.addClass("inactive");
}

function loginListener() {
    $(document).on("click", ".login__submit", function(e) {

        getAuthorizationCode();
        if (animating) return;
        animating = true;
        var that = this;
        ripple($(that), e);
        $(that).addClass("processing");
        setTimeout(function() {
            $(that).addClass("success");
            setTimeout(function() {
                $app.show();
                $app.css("top");
                $app.addClass("active");
            }, submitPhase2 - 70);
            setTimeout(function() {
                $login.hide();
                $login.addClass("inactive");
                animating = false;
                $(that).removeClass("success processing");

            }, submitPhase2);
        }, submitPhase1);
    });
}

function logoutListener() {

    $(document).on("click", ".app__logout", function(e) {
        localStorage.clear();
        if (animating) return;
        $(".ripple").remove();
        animating = true;
        var that = this;
        $(that).addClass("clicked");
        setTimeout(function() {
            $app.removeClass("active");
            $login.show();
            $login.css("top");
            $login.removeClass("inactive");
        }, logoutPhase1 - 120);
        setTimeout(function() {
            $app.hide();
            animating = false;
            $(that).removeClass("clicked");
        }, logoutPhase1);
    });

}

$(document).ready(init);
