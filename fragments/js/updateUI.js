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
    $('#playlist_holder').empty();
    for (i = 0; i < playlists.length; i++) {
        console.log(playlists[i]['playlist_name'])

        $('<li><button class="playlistBtn">'+ playlists[i]['playlist_name']+'</button></li>').appendTo('#playlist_holder')
            .find('.playlistBtn')
            .data('id', playlists[i]['playlist_id'])
            .click(function(e) {
                addToPlaylist($(this).data('id'));
            });
    }
    $(playlist_box).show();

}
