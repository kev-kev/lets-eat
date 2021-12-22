Rails.application.routes.draw do
  get 'ingredients/index'
  get 'ingredients/create'
  get 'ingredients/update'
  get 'ingredients/delete'
  post "/signup", to: "users#signup"
  post "/login", to: "users#login"

  resources :recipes, only: [:index, :destroy, :update]
  post "/submit", to: "recipes#submit"
end
