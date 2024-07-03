class SyncChannel < ApplicationCable::Channel
  def subscribed
    stream_from "sync_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_data(data)
    ActionCable.server.broadcast "sync_channel", data
  end
end
