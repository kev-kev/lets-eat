Rails.application.routes.draw do
  post "/signup", to: "users#signup"
  post "/login", to: "users#login"

  resources :recipes, only: [:index, :destroy]
  post "/submit", to: "recipes#submit"
  patch '/recipes/:id', to: "recipes#change_status"
end
