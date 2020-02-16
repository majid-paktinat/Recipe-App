# Test# Project 1 : Search-For-Recipes
github address : https://github.com/xenetto/SearchRecipes

## api keys:
``` 
Majid : b588453d88164a63a6b235e77276dcd0
Sahar : 7be734db65ca420487a133024e247177
Bowen : 54f37f7c8cf54dabb996147b296b7f34
```

## References:
```

https://api.spoonacular.com/recipes/complexSearch?minFat=1&maxFat=50&number=5&type=salad&addRecipeInformation=true&apiKey=...

https://api.spoonacular.com/food/ingredients/autocomplete?query=appl&number=5&apiKey=...

https://api.spoonacular.com/recipes/{id}/nutritionWidget?&defaultCss=true&apiKey=...

https://spoonacular.com/food-api/docs#Diets
https://spoonacular.com/food-api/docs#Cuisines
https://spoonacular.com/food-api/docs#Meal-Types
https://spoonacular.com/food-api/docs#Intolerances
https://spoonacular.com/food-api/docs#Search-Recipes-Complex

```

## inputs:
    includeIngredients
    excludeIngredients
    type // type=salad
    diet
    intolerances
    cuisine
    number // of result
    addRecipeInformation=true // if result includes recipes

## outputs:
    id
    title
    dishTypes
    nutrition.title
    nutrition.amount
    nutrition.unit
    analyzedInstructions.name
    analyzedInstructions.number
    analyzedInstructions.step
    image
    serving



Sorting ?

recipe search (AutoComplete)






Pagination ?

pass into innerHTML of a div (in same page or new page)
Link to https://api.spoonacular.com/recipes/{id}/nutritionWidget?&defaultCss=trueapiKey=...


next point ham ke font name - font size - bold - underline - .... div haye mokhtalefe... 
