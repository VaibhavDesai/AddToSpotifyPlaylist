
(function() {
    window.oauth2 = {

        access_token_url: "https://accounts.spotify.com/api/token",
        authorization_url: "https://accounts.spotify.com/authorize",
        client_id: '38d01fa5533f418bb9d3a5eb1ea5a296',
        client_secret: '9f92e0dc3e5c49c88a33edcdeae28e16',
        redirect_url: 'https://vaibhavdesai.github.io/',
        scopes: "playlist-read-private playlist-modify playlist-modify-public playlist-modify-private user-read-email",
        response_type:'code',

        /**
         * Starts the authorization process.
         */
        start: function() {
            window.close();
            var url = this.authorization_url + "?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_url + "&response_type="+this.response_type+"&scope="+encodeURIComponent(this.scopes);

            // for(var i in this.scopes) {
            //     url += this.scopes[i];
            // }
            console.log(url);
            chrome.tabs.create({url: url, active: true});
        },

        /**
         * Finishes the oauth2 process by exchanging the given authorization code for an
         * authorization token. The authroiztion token is saved to the browsers local storage.
         * If the redirect page does not return an authorization code or an error occures when
         * exchanging the authorization code for an authorization token then the oauth2 process dies
         * and the authorization tab is closed.
         *
         * @param url The url of the redirect page specified in the authorization request.
         */
        finish: function(url) {

            function removeTab() {
                chrome.tabs.getCurrent(function(tab) {
                    chrome.tabs.remove(tab.id);
                });
            };

            if(url.match(/\?error=(.+)/)) {
                removeTab();
            } else {

                var code = url.match(/\?code=([\w\/\-]+)/)[1];

                localStorage.setItem('authorization_code', code);
                removeTab();
            }
        }
    }
})();