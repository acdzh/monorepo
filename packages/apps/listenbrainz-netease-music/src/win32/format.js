const pkg = require('../../package.json');

function formatToListenBrainzJson(data) {
  const { track } = data;
  return {
    listened_at: Date.now(),
    track_metadata: {
      artists_name: track.artists.map(({ name }) => name).join('/'),
      track_name: track.name,
      release_name: track.album.name,
      additional_info: {
        // artists_mbids: '',
        // release_group_mbid: '',
        // release_mbid: '',
        // recording_mbid: '',
        // track_mbid: '',
        // work_mbids: '',
        tracknumber: track.cd,
        // isrc: '',
        // spotify_id: '',
        // tags: [''],
        media_player: '网易云音乐',
        // media_player_version: '',
        submission_client: pkg.name,
        submission_client_version: pkg.version,
        music_service: 'music.163.com',
        // music_service_name: '163-music',
        origin_url: `https://music.163.com/#/song?id=${track.id}`,
        raw_data: data,
      },
    },
  };
}

module.exports = formatToListenBrainzJson;
