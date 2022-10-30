Rails.application.routes.draw do
  # Sessions routes
  post 'sessions/create', to: 'sessions#create'

  # Users routes
  post 'users/create', to: 'users#create'
end
