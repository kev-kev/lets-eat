Rails.application.routes.draw do
  post "/signup", to: "users#signup"
  post "/login", to: "users#login"
end
