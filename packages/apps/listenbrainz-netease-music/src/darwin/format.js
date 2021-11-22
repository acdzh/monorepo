const pkg = require('../../package.json');

function formatToListenBrainzJson(data) {
  return {
    listened_at: Date.now(),
    track_metadata: {
      artists_name: data.artistName,
      track_name: data.songName,
      release_name: data.albumName,
      additional_info: {
        // artists_mbids: '',
        // release_group_mbid: '',
        // release_mbid: '',
        // recording_mbid: '',
        // track_mbid: '',
        // work_mbids: '',
        // tracknumber: '',
        // isrc: '',
        // spotify_id: '',
        // tags: [''],
        media_player: '网易云音乐',
        // media_player_version: '',
        submission_client: pkg.name,
        submission_client_version: pkg.version,
        music_service: 'music.163.com',
        // music_service_name: '163-music',
        origin_url: `https://music.163.com/#/song?id=${data.songId}`,
        raw_data: data,
        raw_data_from: 'darwin',
      },
    },
  };
}

module.exports = formatToListenBrainzJson;
