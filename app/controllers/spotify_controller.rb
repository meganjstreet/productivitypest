# app/controllers/spotify_controller.rb
class SpotifyController < ApplicationController
  require 'net/http'
  require 'uri'
  require 'json'

  def login
    scope = 'streaming user-read-email user-read-private'
    redirect_to "https://accounts.spotify.com/authorize?response_type=code&client_id=#{ENV['SPOTIFY_CLIENT_ID']}&scope=#{URI.encode(scope)}&redirect_uri=#{URI.encode(ENV['SPOTIFY_REDIRECT_URI'])}"
  end

  def callback
    code = params[:code]
    uri = URI.parse("https://accounts.spotify.com/api/token")
    request = Net::HTTP::Post.new(uri)
    request.set_form_data(
      "grant_type" => "authorization_code",
      "code" => code,
      "redirect_uri" => ENV['SPOTIFY_REDIRECT_URI'],
      "client_id" => ENV['SPOTIFY_CLIENT_ID'],
      "client_secret" => ENV['SPOTIFY_CLIENT_SECRET']
    )

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(request)
    end

    result = JSON.parse(response.body)
    access_token = result["access_token"]

    # Store the access token securely, e.g., in the session or database
    session[:spotify_access_token] = access_token

    redirect_to root_path
  end
end
