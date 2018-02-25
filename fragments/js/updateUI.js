function updateUIWithPlaylists() {

    playlists = JSON.parse(localStorage.getItem('playlists'))
    $('#playlist_holder').empty();
    for (i = 0; i < playlists.length; i++) {

        $('<ui><button class="playlistBtn">'+ playlists[i]['playlist_name']+'</button></ui>').appendTo('#playlist_holder')
            .find('.playlistBtn')
            .data('id', playlists[i]['playlist_id'])
            .click(function(e) {
                addToPlaylist($(this).data('id'));
            });
    }
    $(playlist_box).show();

}
