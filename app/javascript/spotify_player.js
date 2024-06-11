document.addEventListener('DOMContentLoaded', () => {
  const token = '<YOUR_SPOTIFY_ACCESS_TOKEN>';

  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Spotify Web Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);

      // Add click event listener to the play button
      document.getElementById('play-button').addEventListener('click', () => {
        // Play a track
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: ['spotify:track:1ZUjVHrZWEg5a9j89QL5aE'] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
      });
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.connect();
  };
});
