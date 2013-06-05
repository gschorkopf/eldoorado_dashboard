class DashboardController < ApplicationController
  def show
    gon.badge_scans = []
  end

  def search
    @badge_scans = []

    if params[:q]
      @params = params[:q]
      @badge_scans = return_badge_scans_from_params(params[:q])
    end

    gon.badge_scans = @badge_scans
  end
end