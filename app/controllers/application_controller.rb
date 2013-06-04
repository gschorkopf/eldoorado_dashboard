class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :badges_gem

  def badges_gem
    @badges_gem ||= Eldoorado::BadgeScan.all
  end
end
