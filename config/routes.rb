Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  root to: "pages#home"

  get "/service-worker.js" => "service_worker#service_worker"
  get "/manifest.json" => "service_worker#manifest"

  get 'pages/home'
  resources :water_trackers, only: [:new, :create, :update ] do
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
    resources :days, only: [:create, :update]
  end

  resources :challenges, only: [:create, :update] do
    resources :challenge_participants, only: [:create]
  end

  resources :pomodoros, only: [:create] do
    member do
      patch :complete
    end
  end

  resources :lists do
    resources :list_items, only: [:create]
  end

  resources :list_items, only: [:update, :destroy]

  resources :schedule do
    resources :schedule_tasks, only: [:create, :update]
  end

  resources :schedule_tasks, only: [:destroy]
end
