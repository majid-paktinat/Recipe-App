
let nutritionArr = [];
let analyzedInstructionsArr = [];

let imageAdd;
let mealImage

let settings = {
	"async": true,
	"crossDomain": true,
    "method": "GET",
    "url": "https://api.spoonacular.com/recipes/complexSearch?minFat=1&maxFat=50&minCarbs=5&maxCarbs=100&number=5&type=salad&addRecipeInformation=true&apiKey=b588453d88164a63a6b235e77276dcd0"
    //"url": "https://api.spoonacular.com/recipes/582897/nutritionWidget?apiKey=54f37f7c8cf54dabb996147b296b7f34&defaultCss=true" //$('body').html(response);
    
	}


$.ajax(settings).then(getResponse);

$.ajax(settings).fail(getError);


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
        while (analyzedInstructionsCounter<analyzedInstructionsArr.length){
            while(stepsCounter<analyzedInstructionsArr[analyzedInstructionsCounter].steps.length){
                console.log(`analyzedInstructions Name : ${analyzedInstructionsArr[analyzedInstructionsCounter].name}`); 
                console.log(`analyzedInstructions Steps(number) : ${analyzedInstructionsArr[analyzedInstructionsCounter].steps[stepsCounter].number}`);
                console.log(`analyzedInstructions Steps(step) : ${analyzedInstructionsArr[analyzedInstructionsCounter].steps[stepsCounter].step}`);
                stepsCounter = stepsCounter + 1;
            }
            console.log("---------------------------------------");
            analyzedInstructionsCounter = analyzedInstructionsCounter + 1;
            stepsCounter = 0;
        }

        
        imageAdd = response.results[resultsCounter].image; 
        mealImage = $('<img />');
        mealImage.attr("src", imageAdd);
        $('#meal-image-view').append(mealImage);
        
        resultsCounter = resultsCounter + 1;
    }

    
    
   
}
function getError( errorStatus ) {
    console.log(`<.Fail> callback <${errorStatus}>`);
}

