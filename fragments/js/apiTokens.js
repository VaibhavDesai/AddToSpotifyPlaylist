function getRefreshToken(callbackFunction) {

    jQuery.ajax({

        type:'POST',
        url:token_url,
        headers: {
            'Authorization': 'Basic ' +  btoa(client_id + ":" + client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        data:{
            'grant_type': 'authorization_code',
            'refresh_token': localStorage.getItem('refresh_token')
        },

        success: function(responseText) {
            localStorage.setItem('access_token', responseText['access_token']);
            localStorage.setItem('access_token_expires_in', Date.now() +(parseInt(responseText['expires_in'])*1000));

            if (callbackFunction == 'getPlaylists'){
                getPlaylists();
            }
            if (callbackFunction == 'searchTrack'){
                searchTrack();
            }
            if (callbackFunction == 'getUserDetails'){
                getUserDetails();
            }

        },

        error: function (response) {
            if (response['status'] == '401'){
                console.log("There is a error in getRefreshToken()");
            }

        }
    });
}

function getAccessToken(){

    jQuery.ajax({
        type:'POST',
        url:token_url,
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
            localStorage.setItem('refresh_token', responseText['refresh_token']);
            localStorage.setItem('access_token_expires_in', Date.now() +(parseInt(responseText['expires_in'])*1000) )
            console.log('Access token:',  responseText);
            updateUI();
            getUserDetails();
            getPlaylists();
        }

    });
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