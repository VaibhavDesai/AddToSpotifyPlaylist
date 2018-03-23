function updateUIWithPlaylists() {

    playlists = JSON.parse(localStorage.getItem('playlists'))
    $('#playlist_holder').empty();
    for (i = 0; i < playlists.length; i++) {

        var playlist_id = playlists[i]['playlist_id']
        var add_to_btn = '<i class="material-icons playlistBtn" id='+playlist_id+'>playlist_add</i>'+ '<span style="vertical-align: super; padding: 5px;">'+ playlists[i]['playlist_name']+'</span>';

        $('<ui>'+add_to_btn+'</ui>').appendTo('#playlist_holder')
            .find('.playlistBtn')
            .data('id', playlists[i]['playlist_id'])
            .click(function(e) {
                addToPlaylist($(this).data('id'));
            });
    }
    $(playlist_box).show();

}

function updatePlaylistButton(playlist_id) {

    document.getElementById(playlist_id).innerText = "playlist_add_check";
}
