Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/login' => 'sessions#login'
  post '/signup' => 'sessions#sign_up'
  post '/submitScore' => 'sessions#submit_score'
  post '/savePresets' => 'sessions#save_presets'
end
