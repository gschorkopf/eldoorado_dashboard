class DashboardController < ApplicationController
  def show
    @autofill = "Example: first_name=franklin"

    gon.badge_scans = []
  end

  def search
    @badge_scans = []

    if params[:q]
      if params[:q] == "yesterday"
        @autofill = params[:q]
        @badge_scans = badges_gem.reverse[-502..-1]
        gon.time_lapses = time_lapses_between_scans(@badge_scans)
        gon.counter = true
      else
        @autofill = params[:q]
        @badge_scans = return_badge_scans_from_params(params[:q])
        gon.time_lapses = a = []; (@badge_scans.count).times do; a << 200; end
      end
    end
    
    gon.badge_scans = @badge_scans
  end
end