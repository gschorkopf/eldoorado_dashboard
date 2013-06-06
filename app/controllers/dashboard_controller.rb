class DashboardController < ApplicationController
  def show
    @autofill = "Example: first_name=franklin"

    gon.badge_scans = []
  end

  def search
    @badge_scans = []

    if params[:q]
      if params[:q] = "yesterday"
        @badge_scans = return_badge_scans_from_params("door=atrium OR door=back OR door=front OR door=knoll")[-3000..-1][2496..-1]
      else
        @autofill = params[:q]
        @badge_scans = return_badge_scans_from_params(params[:q])
      end
    end
    
    gon.times = @badge_scans.to_enum(:each_with_index).collect {|b, i| (Time.parse(@badge_scans[i].scan_time).to_i-Time.parse(@badge_scans[i-1].scan_time).to_i+1)}
    gon.badge_scans = @badge_scans
  end
end