
let nutritionArr = [];
let analyzedInstructionsArr = [];

let imageAdd;
let mealImage

const apikey = "b588453d88164a63a6b235e77276dcd0";
//const apikey = "7be734db65ca420487a133024e247177";
//const apikey = "54f37f7c8cf54dabb996147b296b7f34";


let diet;
let cuisine;
let mealType;
let intolerance;
let ingredientIn;
let ingredientEx;
let settings;
    
// This function handles events where one button is clicked
$("#btnSearch").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This part grabs the inputs to do search
    ingredientIn = escape($("#ingredientIn").val().trim());
    ingredientEx = escape($("#ingredientEx").val().trim());
    diet = escape($("#diet").val());diet = (diet=="nal")?"":diet;
    cuisine = escape($("#cuisine").val());cuisine = (cuisine=="nal")?"":cuisine;
    mealType = escape($("#mealType").val());mealType = (mealType=="nal")?"":mealType;
    intolerance =  escape($("#intolerance").val());intolerance = (intolerance=="nal")?"":intolerance;
    //console.log(ingredientIn);console.log(ingredientEx);console.log(diet);console.log(cuisine);console.log(mealType);console.log(intolerance);
    
    
    settings = {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "url": `https://api.spoonacular.com/recipes/complexSearch?minFat=1&maxFat=10000&minCarbs=5&maxCarbs=100&number=${5}&addRecipeInformation=true&includeIngredients=${ingredientIn}&excludeIngredients=${ingredientEx}&diet=${diet}&cuisine=${cuisine}&type=${mealType}&cuisine=${intolerance}&apiKey=${apikey}`
        //"url": "https://api.spoonacular.com/recipes/582897/nutritionWidget?apiKey=54f37f7c8cf54dabb996147b296b7f34&defaultCss=true" //$('body').html(response);
        
        }
    
    
    searchCall();
});


function searchCall(){
    $.ajax(settings).then(getResponse);

    $.ajax(settings).fail(getError);
}



function getResponse( response ){
    console.log(`<.Then> callback <${response}>`);console.log(response);
    
    
    let resultsCounter = 0;
    
    while (resultsCounter<response.results.length){

        console.log(`Id is : ${response.results[resultsCounter].id}`);
        console.log(`Title is : ${response.results[resultsCounter].title}`);
        console.log(`Dish Types : ${response.results[resultsCounter].dishTypes}`);
        
        nutritionArr = response.results[resultsCounter].nutrition; 
        let nutritionCounter = 0;
        while(nutritionCounter<nutritionArr.length){
            console.log(`Nutrition Title : ${nutritionArr[nutritionCounter].title}`); 
            console.log(`Nutrition Amount : ${nutritionArr[nutritionCounter].amount}`); 
            console.log(`Nutrition Unit : ${nutritionArr[nutritionCounter].unit}`); 
            console.log("--nutrition--");
            nutritionCounter = nutritionCounter + 1;
        }

        console.log(`Servings : ${response.results[resultsCounter].servings}`);
        analyzedInstructionsArr = response.results[resultsCounter].analyzedInstructions; 
        let analyzedInstructionsCounter=0;
        let stepsCounter = 0;
        let recipeConcat;
        while (analyzedInstructionsCounter<analyzedInstructionsArr.length){
            recipeConcat = "Recipe : ";
            while(stepsCounter<analyzedInstructionsArr[analyzedInstructionsCounter].steps.length){
                console.log(`analyzedInstructions Name : ${analyzedInstructionsArr[analyzedInstructionsCounter].name}`); 
                console.log(`analyzedInstructions Steps(number) : ${analyzedInstructionsArr[analyzedInstructionsCounter].steps[stepsCounter].number}`);
                console.log(`analyzedInstructions Steps(step) : ${analyzedInstructionsArr[analyzedInstructionsCounter].steps[stepsCounter].step}`);
                recipeConcat = recipeConcat + ((recipeConcat=="Recipe : ")?"":" | ") + analyzedInstructionsArr[analyzedInstructionsCounter].steps[stepsCounter].step;
                stepsCounter = stepsCounter + 1;
            }
            console.log("---------------------------------------");
            analyzedInstructionsCounter = analyzedInstructionsCounter + 1;
            stepsCounter = 0;
        }

        
        $(`#titleEl${resultsCounter+1}`).text(response.results[resultsCounter].title); //NOT --> $('#titleEl').val(response.results[resultsCounter].title);
        
        imageAdd = response.results[resultsCounter].image;  
        $(`#currentMealImgEl${resultsCounter+1}`).attr("src", imageAdd);
        // OR --> // imageAdd = response.results[resultsCounter].image; mealImage = $('<img />'); mealImage.attr("src", imageAdd); $('#meal-image-view').append(mealImage);

        
        $(`#recipeEl${resultsCounter+1}`).text(recipeConcat); 

        
        document.querySelector(`#meal-image-view${resultsCounter+1}`).style.opacity = 1;
        if (resultsCounter!=0) document.querySelector(`#resultView`).style.opacity = 1;

        resultsCounter = resultsCounter + 1;
    }

    
    
    
    
    
    
}
function getError( errorStatus ) {
    console.log(`<.Fail> callback <${errorStatus}>`);
}


