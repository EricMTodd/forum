Rails.application.routes.draw do
  # Sessions routes
  post 'sessions/logged_in', to: 'sessions#logged_in'
  post 'sessions/create', to: 'sessions#create'

  # Users routes
  get 'users/:id', to: 'users#show'
  post 'users/create', to: 'users#create'
  patch 'users/:id', to: 'users#update'
  post 'users/:id/destroy', to: 'users#destroy'

  # Posts routes
  get 'posts', to: 'posts#index'
  get 'posts/:id', to: 'posts#show'
  post 'posts/create', to: 'posts#create'
  patch 'posts/:id/update', to: 'posts#update'
  delete 'posts/:id/destroy', to: 'posts#destroy'

  # Comments routes
  post 'comments/create', to: 'comments#create'
  delete 'comments/:id/destroy', to: 'comments#destroy'
  patch 'comments/:id/update', to: 'comments#update'
end
