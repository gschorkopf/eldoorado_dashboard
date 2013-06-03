class DashboardController < ApplicationController
  def show
  end

  def search
    badge_scans = []

    if params[:q]
      # query = Rack::Utils.parse_nested_query params[:q]
      company = Eldoorado::Company.find_by_name(params[:q])
      company.badge_scans.each do |badge_scan|
        badge_scans << badge_scan
      end

      @badge_scans = badge_scans.sort_by(&:scan_date).reverse
    end

    @badge_scans
    # if params[:q]
    #   queries = params[:q].gsub("AND", "&").split("OR")
    #   queries.each do |query|
    #     parsed = Rack::Utils.parse_nested_query query

    #     scans.each do |scan|
    #       validity = []
    #       parsed.each_pair do |param, value|
    #         if scan[param.strip] && scan[param.strip].downcase.include?(value.downcase.strip)
    #           validity << true
    #         else
    #           validity << false
    #         end
    #       end

    #       @badge_scans << scan unless validity.include? false
    #     end
    #   end
    # end
  end
end