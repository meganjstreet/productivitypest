Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  root to: "pages#home"
  resources :water_trackers, only: [:new, :create, :update, :destroy, :reset] do
    member do
      get :take_glass_of_water
      patch :take_glass_of_water
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :users, only: [] do
    resources :days, only: [:create]
  end

  resources :pomodoros, only: [:create] do
    member do
      patch :complete
    end
  end

  resources :lists do
    resources :list_item, only: [:create]
  end

    # Defines the root path route ("/")
    # root "posts#index"
end
