function updateUIWithPlaylists() {

    playlists = JSON.parse(localStorage.getItem('playlists'))
    $('#playlist_holder').empty();
    for (i = 0; i < playlists.length; i++) {
        var playlist_id = playlists[i]['playlist_id']
        $('<ui><button class="playlistBtn" id='+playlist_id+'>'+ playlists[i]['playlist_name']+'</button></ui>').appendTo('#playlist_holder')
            .find('.playlistBtn')
            .data('id', playlists[i]['playlist_id'])
            .click(function(e) {
                addToPlaylist($(this).data('id'));
            });
    }
    $(playlist_box).show();

}

function updatePlaylistButton(playlist_id) {
    document.getElementById(playlist_id).style.background='#41ff0f';
}
