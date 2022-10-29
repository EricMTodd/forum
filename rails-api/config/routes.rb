Rails.application.routes.draw do
  # Users routes
  post 'users/create', to: 'users#create'
end
