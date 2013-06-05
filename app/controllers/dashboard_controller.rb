class DashboardController < ApplicationController
  def show
    gon.badge_scans = []
  end

  def search
    scans = badges_gem
    @badge_scans = []
    if params[:q]
      @params = params[:q]
      queries = params[:q].gsub("AND", "&").split("OR")
      queries.each do |query|
        parsed = Rack::Utils.parse_nested_query query

        scans.each do |scan|
          validity = []
          parsed.each_pair do |param, value|
            if scan[param.strip] && scan[param.strip].downcase.include?(value.downcase.strip)
              validity << true
            else
              validity << false
            end
          end

          @badge_scans << scan unless validity.include? false
        end
      end
    end
    @badge_scans.sort_by! {|scan| scan.scan_time }
    gon.badge_scans = @badge_scans
  end
end