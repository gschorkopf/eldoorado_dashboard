class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :badges_gem

  def badges_gem
    @badges_gem ||= Eldoorado::BadgeScan.all
  end

  def return_badge_scans_from_params(params)
    badge_scans = []
    queries = params.gsub("AND", "&").split("OR")
    queries.each do |query|
      parsed = Rack::Utils.parse_nested_query query
      badges_gem.each do |scan|
        badge_scans << scan unless scan_has_any_invalid_params(scan, parsed)
      end
    end
    return sorted_asc_by_date(badge_scans)
  end

  def scan_has_any_invalid_params(scan, parsed)
    validity = []
    parsed.each_pair do |param, value|
      if scan[param.strip] && scan_includes_value(scan, param, value)
        validity << true
      else
        validity << false
      end
    end
    validity.include? false
  end

  def sorted_asc_by_date(badge_scans)
    badge_scans.sort_by! {|scan| scan.scan_time }
  end

  def scan_includes_value(scan, param, value)
    scan[param.strip].downcase.include?(value.downcase.strip)
  end

  def time_lapses_between_scans(badge_scans)
    badge_scans.to_enum(:each_with_index).collect do |badge_scan, i|
      current_time = Time.parse(badge_scans[i].scan_time).to_i
      previous_time = Time.parse(@badge_scans[i-1].scan_time).to_i

      distance_between_times = current_time - previous_time + 1
      distance_between_times
    end
  end
end
