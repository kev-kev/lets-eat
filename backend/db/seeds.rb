require 'date'
require 'active_support/core_ext/date/calculations'

User.create(username: 'test1', password: '123123', password_confirmation: '123123')
User.create(username: 'test2', password: '123123', password_confirmation: '123123')

# approved recipes
Recipe.create!(name: 'Turkey Tetrazzini', link: 'https://www.simplyrecipes.com/recipes/turkey_tetrazzini/', notes: 'Sub oatmilk for the heavy cream and add 1 tbsp extra butter', user_id: 1, status:1, weeks:[Date.today.sunday.iso8601])
Recipe.create!(name: 'Easy Pan-Roasted Chicken Breasts With Lemon and Rosemary Pan Sauce', link: 'https://www.seriouseats.com/easy-pan-roasted-chicken-breast-lemon-rosemary-pan-sauce-recipe', user_id: 2, status: 1, weeks:[Date.today.last_week.sunday.iso8601], img_url: 'https://www.seriouseats.com/thmb/bY3gSmpX0WUpll_1c1Z4-IPg9L4=/900x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__04__20150410-chicken-lemon-rosemary-pan-sauce-recipe-5-c8624bb664ed4c54945bbf26c0d2354e.jpg')
Recipe.create!(name: 'Pork Bo Ssam', link: 'https://cooking.nytimes.com/recipes/12197-momofukus-bo-ssam', notes: 'Overnight marinade, 6 hour roast at 300', user_id: 1, status: 1, is_favorited: true, weeks:[Date.today.next_week.sunday.iso8601])
Recipe.create!(name: 'Kimchi Soondubu Jjigae (Soft Tofu Stew)', link: 'https://www.koreanbapsang.com/kimchi-soondubu-jjigae-soft-tofu-stew-kimchi/', user_id: 2, status: 1, is_favorited: true)
# 100.times{Recipe.create!(name: 'Grapes', link: 'https://www.youtube.com/watch?v=M5V_IXMewl4', user_id: 2, status: 1, is_favorited: false, img_url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/70d2704a-9bc6-4d06-8394-d7f95afdd087/d3d3lo3-8274eb4c-8f40-46b9-a532-f538e35af100.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcwZDI3MDRhLTliYzYtNGQwNi04Mzk0LWQ3Zjk1YWZkZDA4N1wvZDNkM2xvMy04Mjc0ZWI0Yy04ZjQwLTQ2YjktYTUzMi1mNTM4ZTM1YWYxMDAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7RSkrPUceb7woIWNL8NCLq583Wxcsg7gjUlWUSmLwEg")}
# 100.times{Recipe.create!(name: 'Hotdog', link: 'https://www.youtube.com/watch?v=M5V_IXMewl4', user_id: 2, status: 1, is_favorited: false, img_url: "https://ih1.redbubble.net/image.1119553706.5096/st,small,845x845-pad,1000x1000,f8f8f8.jpg")}

# pending recipes for each user
Recipe.create!(name: 'Other Turkey Tetrazzini', link: 'https://www.simplyrecipes.com/recipes/turkey_tetrazzini/', notes: 'Sub oatmilk for the heavy cream and add 1 tbsp extra butter', user_id: 1, status: 0)
Recipe.create!(name: 'Different Easy Pan-Roasted Chicken Breasts With Lemon and Rosemary Pan Sauce', link: 'https://www.seriouseats.com/easy-pan-roasted-chicken-breast-lemon-rosemary-pan-sauce-recipe', user_id: 2, status: 0, img_url: 'https://www.seriouseats.com/thmb/bY3gSmpX0WUpll_1c1Z4-IPg9L4=/900x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__04__20150410-chicken-lemon-rosemary-pan-sauce-recipe-5-c8624bb664ed4c54945bbf26c0d2354e.jpg')
Recipe.create!(name: 'Another Pork Bo Ssam', link: 'https://cooking.nytimes.com/recipes/12197-momofukus-bo-ssam', notes: 'Overnight marinade, 6 hour roast at 300', user_id: 1, status: 0)
Recipe.create!(name: 'It\'s Kimchi Soondubu Jjigae (Soft Tofu Stew)', link: 'https://www.koreanbapsang.com/kimchi-soondubu-jjigae-soft-tofu-stew-kimchi/', user_id: 2, status: 0)

# rejected recipes
Recipe.create(name: 'Turkey Tetrazzini', link: 'https://www.simplyrecipes.com/recipes/turkey_tetrazzini/', notes: 'Sub oatmilk for the heavy cream and add 1 tbsp extra butter', user_id: 1, status: 2)
Recipe.create(name: 'Easy Pan-Roasted Chicken Breasts With Lemon and Rosemary Pan Sauce', link: 'https://www.seriouseats.com/easy-pan-roasted-chicken-breast-lemon-rosemary-pan-sauce-recipe', user_id: 2, status: 2, img_url: 'https://www.seriouseats.com/thmb/bY3gSmpX0WUpll_1c1Z4-IPg9L4=/900x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__04__20150410-chicken-lemon-rosemary-pan-sauce-recipe-5-c8624bb664ed4c54945bbf26c0d2354e.jpg')

