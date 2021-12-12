User.create(username: 'test1', password: '123123', password_confirmation: '123123')
User.create(username: 'test2', password: '123123', password_confirmation: '123123')

# approved recipes
Recipe.create!(name: 'Turkey Tetrazzini', link: 'https://www.simplyrecipes.com/recipes/turkey_tetrazzini/', notes: 'Sub oatmilk for the heavy cream and add 1 tbsp extra butter', user_id: 1, status:1)
Recipe.create!(name: 'Easy Pan-Roasted Chicken Breasts With Lemon and Rosemary Pan Sauce', link: 'https://www.seriouseats.com/easy-pan-roasted-chicken-breast-lemon-rosemary-pan-sauce-recipe', user_id: 2, status: 1, img_url: 'https://www.seriouseats.com/thmb/bY3gSmpX0WUpll_1c1Z4-IPg9L4=/900x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__04__20150410-chicken-lemon-rosemary-pan-sauce-recipe-5-c8624bb664ed4c54945bbf26c0d2354e.jpg')
Recipe.create!(name: 'Pork Bo Ssam', link: 'https://cooking.nytimes.com/recipes/12197-momofukus-bo-ssam', notes: 'Overnight marinade, 6 hour roast at 300', user_id: 1, status: 1, is_favorited: true)
Recipe.create!(name: 'Kimchi Soondubu Jjigae (Soft Tofu Stew)', link: 'https://www.koreanbapsang.com/kimchi-soondubu-jjigae-soft-tofu-stew-kimchi/', user_id: 2, status: 1, is_favorited: true)

# pending recipes for each user
Recipe.create!(name: 'Other Turkey Tetrazzini', link: 'https://www.simplyrecipes.com/recipes/turkey_tetrazzini/', notes: 'Sub oatmilk for the heavy cream and add 1 tbsp extra butter', user_id: 1, status: 0)
Recipe.create!(name: 'Different Easy Pan-Roasted Chicken Breasts With Lemon and Rosemary Pan Sauce', link: 'https://www.seriouseats.com/easy-pan-roasted-chicken-breast-lemon-rosemary-pan-sauce-recipe', user_id: 2, status: 0, img_url: 'https://www.seriouseats.com/thmb/bY3gSmpX0WUpll_1c1Z4-IPg9L4=/900x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__04__20150410-chicken-lemon-rosemary-pan-sauce-recipe-5-c8624bb664ed4c54945bbf26c0d2354e.jpg')
Recipe.create!(name: 'Another Pork Bo Ssam', link: 'https://cooking.nytimes.com/recipes/12197-momofukus-bo-ssam', notes: 'Overnight marinade, 6 hour roast at 300', user_id: 1, status: 0)
Recipe.create!(name: 'It\'s Kimchi Soondubu Jjigae (Soft Tofu Stew)', link: 'https://www.koreanbapsang.com/kimchi-soondubu-jjigae-soft-tofu-stew-kimchi/', user_id: 2, status: 0)

# rejected recipes
Recipe.create(name: 'Turkey Tetrazzini', link: 'https://www.simplyrecipes.com/recipes/turkey_tetrazzini/', notes: 'Sub oatmilk for the heavy cream and add 1 tbsp extra butter', user_id: 1, status: 2)
Recipe.create(name: 'Easy Pan-Roasted Chicken Breasts With Lemon and Rosemary Pan Sauce', link: 'https://www.seriouseats.com/easy-pan-roasted-chicken-breast-lemon-rosemary-pan-sauce-recipe', user_id: 2, status: 2, img_url: 'https://www.seriouseats.com/thmb/bY3gSmpX0WUpll_1c1Z4-IPg9L4=/900x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__04__20150410-chicken-lemon-rosemary-pan-sauce-recipe-5-c8624bb664ed4c54945bbf26c0d2354e.jpg')

