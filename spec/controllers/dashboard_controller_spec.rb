require 'spec_helper'

describe DashboardController do
  describe "GET show" do
    it "should render the root url" do 
      get :show
      response.should render_template(:show)
    end
  end

  describe "GET search" do
    it "should render the search url given valid q" do
      VCR.use_cassette('found_company') do
        get :search, q: "first_name=Geoff"
        response.should render_template(:search)
      end
    end

    it "should render the search url without valid q" do
      get :search
      response.should render_template(:search)
    end
  end
end