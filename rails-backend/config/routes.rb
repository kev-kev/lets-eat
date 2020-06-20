Rails.application.routes.draw do
  resource :users, only: [:create]
  post "/signup", to: "users#signup"
  post "/login", to: "users#login"
end
