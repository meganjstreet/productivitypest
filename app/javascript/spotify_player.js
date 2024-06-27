// app/javascript/controllers/spotify_controller.js
import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    const playlistId = '3Q6ejDVzUBbznjCwTjbC4o'; // Replace with your specific playlist ID
    const token = this.element.dataset.token;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Web Playback SDK Player',
        getOAuthToken: cb => { cb(token); }
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', state => { console.log(state); });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);

        // Play a specific playlist
        fetch(`https://api.spotify.com/v1/me/player/play`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            context_uri: `spotify:playlist:${playlistId}`
          }),
        });
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }
}
