require 'date'
require 'active_support/core_ext/date/calculations'

if Rails.env.development?
  User.create(username: 'test1', password: '123123', password_confirmation: '123123')
  User.create(username: 'test2', password: '123123', password_confirmation: '123123')
end

60.times do 
  rand_status = rand(0..2)
  Recipe.create!(
    name: Faker::Food.dish,
    link: 'https://www.example.com',
    notes: Faker::Food.description,
    user_id: rand(1..2),
    status: rand_status,
    is_favorited: rand_status == 1 && rand(1..3) == 1,
    weeks: rand(1..5) == 1 ? [Date.today.sunday.advance(weeks: rand(1..12)).iso8601] : []
  )
end
10.times do
  Ingredient.create!(
    name: Faker::Food.ingredient,
    unit: [
      "gram",
      "kilogram",
      "ounce",
      "pound",
      "milliliter",
      "liter",
      "teaspoon",
      "tablespoon",
      "cup",
      "pint",
      "quart",
      "gallon"
    ].sample
  )
end
200.times do
  RecipeIngredient.create!(
    recipe_id: rand(1..60),
    ingredient_id: rand(1..10),
    count: rand(1..8)
  )
end
# end