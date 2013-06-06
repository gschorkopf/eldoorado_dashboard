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

    # one_day = 10.seconds
    # time_constant = DateTime.parse(@badge_scans.last.scan_time).to_i - DateTime.parse(@badge_scans.first.scan_time).to_i
    # fail
    gon.badge_scans = @badge_scans
  end
end