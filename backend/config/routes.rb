Rails.application.routes.draw do
  post "/signup", to: "users#signup"
  post "/login", to: "users#login"

  resources :recipes, only: [:index, :destroy, :update]
  post "/submit", to: "recipes#submit"

  get "/grocery_list", to: "home#get_grocery_list"
end
