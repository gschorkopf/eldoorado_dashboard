class DashboardController < ApplicationController
  def show
    @autofill = "Example: first_name=franklin"

    gon.badge_scans = []
  end

  def search
    @badge_scans = []

    if params[:q]
      @autofill = params[:q]
      @badge_scans = return_badge_scans_from_params(params[:q])
    end

    gon.badge_scans = @badge_scans
  end
end