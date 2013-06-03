EldooradoDashboard::Application.routes.draw do
  root to: "dashboard#show"

  get "/search" => "dashboard#search"
end
