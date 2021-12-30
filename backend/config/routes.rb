Rails.application.routes.draw do
  post "/signup", to: "users#signup"
  post "/login", to: "users#login"

  resources :recipes, only: [:index, :destroy, :update]
  post "/submit", to: "recipes#submit"
end
