Rails.application.routes.draw do
  post "/signup", to: "users#signup"
  post "/login", to: "users#login"

  resources :recipes, only: [:index]
  post "/submit", to: "recipes#submit"
  put '/recipes/change-status', to: "recipes#change_status"
end
