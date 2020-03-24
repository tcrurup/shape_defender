# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

*Database Creation
    -run $rake db:migrate to create the database

*Initial Use
    -type 'rails server' into the command line to start the server and navigate your browser to localhost/:3000 to go to a sign up page.  Create the first user accounts to begin

    -Accounts are limited by the username and wont allow for any duplicate names 

    -Each account has up to 3 presets saved to the database that belong to a user

    -Change the game settings to change ther overall score multiplier.  Try to find the best combinations for efficient score to time spent playing and top the leaderboards

    -Leaderboards refresh asynchrously after the completion of every game

    -Page should never need to reload