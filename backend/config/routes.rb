Rails.application.routes.draw do
  post "/login", to: "users#login"

  resources :recipes, only: [:index, :destroy, :update, :create]

  get "/grocery_list", to: "home#get_grocery_list"
  get "/ingredients_list", to: "home#get_ingredients_list"
end
