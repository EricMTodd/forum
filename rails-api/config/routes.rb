Rails.application.routes.draw do
  # Sessions routes
  post 'sessions/logged_in', to: 'sessions#logged_in'
  post 'sessions/create', to: 'sessions#create'

  # Users routes
  post 'users/create', to: 'users#create'
  get 'users/:id', to: 'users#show'
end
