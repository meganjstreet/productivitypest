class SpotifyController < ApplicationController
  require 'rspotify/oauth'

  def auth
    scopes = 'user-read-playback-state user-modify-playback-state user-read-private user-read-email streaming'
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    redirect_to RSpotify::User.new(nil).authorize_url(scope: scopes, redirect_uri: 'http://localhost:3000/spotify/callback')
  end

  def callback
    auth_response = RSpotify::User.new_from_auth(request.env['omniauth.auth'])
    session[:spotify_auth] = auth_response.to_hash
    redirect_to root_path
  end
end
