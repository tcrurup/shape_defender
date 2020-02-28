# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'cody', password: 'cody', highscore: 3000)
User.create(username: 'nazif', password: 'nazif', highscore: 2000)
User.create(username: 'nathan', password: 'nathan', highscore: 1000)
User.create(username: 'tony', password: 'tony', highscore: 2500)
User.create(username: 'jen', password: 'jen', highscore: 5000)