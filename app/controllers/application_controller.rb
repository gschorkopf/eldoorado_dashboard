class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :badges_json, :badges_url, :badges_gem

  def badges_url
    "http://eldoorado-api.herokuapp.com/badge_scans.json"
  end

  def badges_json
    @badges_json ||= JSON.parse RestClient.get(badges_url)
  end

  def badges_gem
    @badges_gem ||= Eldoorado::BadgeScan.all
  end
end
