
let nutritionArr = [];
let analyzedInstructionsArr = [];

let imageAdd;
let mealImage;

//const apikey = "78e1edf89c554641b274c2f5f5c2a0d6"; 
//const apikey = "b588453d88164a63a6b235e77276dcd0";
//const apikey = "c41463de00f744d08ecd2094f8d0da82";
//const apikey = "54f37f7c8cf54dabb996147b296b7f34";
const apikey = "f7d2e42f8f3547939398de9ab74f4ade"; 

let diet;
let cuisine;
let mealType;
let intolerance;
let ingredientIn;
let ingredientEx;
let sortByItem;
let recipeName;
let settings;
let sortOrder = "desc";
let offset = 0;
let resultNumbers = 2;
let totalResults;
document.querySelector("#prevbutton").disabled = true;
    
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
    sortByItem =  escape($("#sortByI").val());sortByItem = (sortByItem=="nal")?"":sortByItem;
    recipeName =  escape($("#recipeName").val().trim());
    
    settingsAPI = {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "url": `https://api.spoonacular.com/recipes/complexSearch?minCalories=1&maxCalories=10000&minProtein=1&maxProtein=10000&minFat=1&maxFat=10000&minCarbs=1&maxCarbs=10000&number=${resultNumbers}&offset=${offset}&addRecipeInformation=true&sort=${sortByItem}&sortDirection=${sortOrder}&includeIngredients=${ingredientIn}&excludeIngredients=${ingredientEx}&diet=${diet}&cuisine=${cuisine}&type=${mealType}&cuisine=${intolerance}&apiKey=${apikey}`
    }

    document.querySelector("#pagingEl").style.opacity = 1;
    if (recipeName!="") {
        settingsAPI.url = `https://api.spoonacular.com/recipes/search?query=${recipeName}&number=${resultNumbers}&offset=${offset}&instructionsRequired=true&apiKey=${apikey}`;
        infoCall();
        offset = 0; // reset the offset
        $("#recipeName").val("");
    }
    else {
        searchCall();
    }

});


function searchCall(){
    $.ajax(settingsAPI).then(getResponse);

    $.ajax(settingsAPI).fail(getError);
}

function infoCall(){
    $.ajax(settingsAPI).then(getInfoResponse);

    $.ajax(settingsAPI).fail(getInfoError);
}


function getResponse( response ){
    console.log(`<.Then> callback <${response}>`);//console.log(response.totalResults);
    document.querySelector("#resultView").style.opacity = 1;
    if (response.totalResults==0) {
        console.log("Search Result is empty!"); 
        document.querySelector("#errorEl").style.opacity = 1;
        document.querySelector("#pagingEl").style.opacity = 0;
        document.querySelector("#meal-image-view1").style.opacity = 0;
        document.querySelector("#meal-image-view2").style.opacity = 0;
        return;
    }
    else {
        document.querySelector("#errorEl").style.opacity = 0;
        document.querySelector("#pagingEl").style.opacity = 1; checkBtn(); 
        document.querySelector("#meal-image-view1").style.opacity = 1;
        document.querySelector("#meal-image-view2").style.opacity = 1;
        //document.querySelector(`#resultView`).style.opacity = 0;
        totalResults = response.totalResults;
    }
    
    let resultsCounter = 0;
    
    while (resultsCounter<response.results.length){

        // console.log(`Id is : ${response.results[resultsCounter].id}`);
        // console.log(`Title is : ${response.results[resultsCounter].title}`);
        // console.log(`Dish Types : ${response.results[resultsCounter].dishTypes}`);
        
        nutritionArr = response.results[resultsCounter].nutrition;
        let nutritionCounter = 0;
        while(nutritionCounter<nutritionArr.length){
            // console.log(`Nutrition Title : ${nutritionArr[nutritionCounter].title}`);
            // console.log(`Nutrition Amount : ${nutritionArr[nutritionCounter].amount}`);
            // console.log(`Nutrition Unit : ${nutritionArr[nutritionCounter].unit}`);
            // console.log("--nutrition--");
            nutritionCounter = nutritionCounter + 1;
        }

        //console.log(`Servings : ${response.results[resultsCounter].servings}`);
        analyzedInstructionsArr = response.results[resultsCounter].analyzedInstructions;
        let analyzedInstructionsCounter=0;
        let stepsCounter = 0;
        let recipeConcat;
        while (analyzedInstructionsCounter<analyzedInstructionsArr.length){
            recipeConcat = "Recipe : ";
            while(stepsCounter<analyzedInstructionsArr[analyzedInstructionsCounter].steps.length){
                // console.log(`analyzedInstructions Name : ${analyzedInstructionsArr[analyzedInstructionsCounter].name}`);
                // console.log(`analyzedInstructions Steps(number) : ${analyzedInstructionsArr[analyzedInstructionsCounter].steps[stepsCounter].number}`);
                // console.log(`analyzedInstructions Steps(step) : ${analyzedInstructionsArr[analyzedInstructionsCounter].steps[stepsCounter].step}`);
                recipeConcat = recipeConcat + ((recipeConcat=="Recipe : ")?"":" | ") + analyzedInstructionsArr[analyzedInstructionsCounter].steps[stepsCounter].step;
                stepsCounter = stepsCounter + 1;
            }
            //console.log("---------------------------------------");
            analyzedInstructionsCounter = analyzedInstructionsCounter + 1;
            stepsCounter = 0;
        }

        
        $(`#titleEl${resultsCounter+1}`).text(response.results[resultsCounter].title); //NOT --> $('#titleEl').val(response.results[resultsCounter].title);
        
        imageAdd = response.results[resultsCounter].image;
        $(`#currentMealImgEl${resultsCounter+1}`).attr("src", imageAdd);
        // OR --> // imageAdd = response.results[resultsCounter].image; mealImage = $('<img />'); mealImage.attr("src", imageAdd); $('#meal-image-view').append(mealImage);

        
        $(`#recipeEl${resultsCounter+1}`).text(recipeConcat);

        
        $(`#calEl${resultsCounter+1}`).html("Calories : " + Math.floor(nutritionArr[0].amount)+ " <b>" +nutritionArr[0].unit + "</b>");
        $(`#proEl${resultsCounter+1}`).html("Protein : " + Math.floor(nutritionArr[1].amount)+ " <b>" +nutritionArr[1].unit + "</b>");
        $(`#fatEl${resultsCounter+1}`).html("Fat : " + Math.floor(nutritionArr[2].amount)+ " <b>" +nutritionArr[2].unit + "</b>");
        $(`#carEl${resultsCounter+1}`).html("Carbs : " + Math.floor(nutritionArr[3].amount)+ " <b>" +nutritionArr[3].unit + "</b>");

        document.querySelector(`#meal-image-view${resultsCounter+1}`).style.opacity = 1;
        if (resultsCounter!=0) document.querySelector(`#resultView`).style.opacity = 1;
        

        resultsCounter = resultsCounter + 1;
    }
    
}


function getError( errorStatus ) {
    console.log(`<.Fail> callback <${errorStatus}>`);
}


function getInfoResponse(response){
    console.log(`<.Then> callback <${response}>`);
    
    document.querySelector("#resultView").style.opacity = 1;
    if (response.totalResults==0) {
        console.log("Search Result is empty!"); 
        document.querySelector("#errorEl").style.opacity = 1;
        document.querySelector("#pagingEl").style.opacity = 0;
        document.querySelector("#meal-image-view1").style.opacity = 0;
        document.querySelector("#meal-image-view2").style.opacity = 0;
        return;
    }
    else {
        document.querySelector("#errorEl").style.opacity = 0;
        document.querySelector("#pagingEl").style.opacity = 0;
        document.querySelector("#meal-image-view1").style.opacity = 1;
        document.querySelector("#meal-image-view2").style.opacity = 0;
        //document.querySelector(`#resultView`).style.opacity = 0;
        totalResults = response.totalResults;
    }


    settingsAPI.url = `https://api.spoonacular.com/recipes/${response.results[0].id}/information?includeNutrition=true&apiKey=${apikey}`;
    $.ajax(settingsAPI).then(function(response){
        let resultsCounter = 0;
            
        nutritionArr = response.nutrition.nutrients; // if response not empty!
       

        $(`#titleEl${resultsCounter+1}`).text(response.title); 
        
        imageAdd = response.image;
        $(`#currentMealImgEl${resultsCounter+1}`).attr("src", imageAdd);

        $(`#recipeEl${resultsCounter+1}`).text("Recipe : " + response.instructions);
                
        $(`#calEl${resultsCounter+1}`).html("Calories : " + Math.floor(nutritionArr[0].amount)+ " <b>" +nutritionArr[0].unit + "</b>");
        $(`#proEl${resultsCounter+1}`).html("Protein : " + Math.floor(nutritionArr[8].amount)+ " <b>" +nutritionArr[8].unit + "</b>");
        $(`#fatEl${resultsCounter+1}`).html("Fat : " + Math.floor(nutritionArr[1].amount)+ " <b>" +nutritionArr[1].unit + "</b>");
        $(`#carEl${resultsCounter+1}`).html("Carbs : " + Math.floor(nutritionArr[3].amount)+ " <b>" +nutritionArr[3].unit + "</b>");

        document.querySelector(`#meal-image-view${resultsCounter+1}`).style.opacity = 1;
        document.querySelector(`#resultView`).style.opacity = 1; // if mokhalefe sefr

        // disbale both the next and previous buttons
        document.querySelector("#prevbutton").disabled = false;
        document.querySelector("#nextbutton").disabled = false;
        

    });

}

function getInfoError(errorStatus){
    console.log(`<.Fail> callback <${errorStatus}>`);
}


function prevBtn(event){
    offset = offset - resultNumbers;
    checkBtn();
    settingsAPI.url = `https://api.spoonacular.com/recipes/complexSearch?minCalories=1&maxCalories=10000&minProtein=1&maxProtein=10000&minFat=1&maxFat=10000&minCarbs=1&maxCarbs=10000&number=${resultNumbers}&offset=${offset}&addRecipeInformation=true&sort=${sortByItem}&sortDirection=${sortOrder}&includeIngredients=${ingredientIn}&excludeIngredients=${ingredientEx}&diet=${diet}&cuisine=${cuisine}&type=${mealType}&cuisine=${intolerance}&apiKey=${apikey}`
    searchCall();
}


function nextBtn(event){
    offset = offset + resultNumbers;
    checkBtn();
    settingsAPI.url = `https://api.spoonacular.com/recipes/complexSearch?minCalories=1&maxCalories=10000&minProtein=1&maxProtein=10000&minFat=1&maxFat=10000&minCarbs=1&maxCarbs=10000&number=${resultNumbers}&offset=${offset}&addRecipeInformation=true&sort=${sortByItem}&sortDirection=${sortOrder}&includeIngredients=${ingredientIn}&excludeIngredients=${ingredientEx}&diet=${diet}&cuisine=${cuisine}&type=${mealType}&cuisine=${intolerance}&apiKey=${apikey}`
    searchCall();
}

function checkBtn(){
    if ((offset) <= 0) {
        offset = 0; 
        document.querySelector("#prevbutton").disabled = true;
    } else if ((offset) >= (totalResults-2)) {
        offset = totalResults - 2 ; // maximum totalResults records will be shown
        document.querySelector("#nextbutton").disabled = true;
    } else{
        document.querySelector("#prevbutton").disabled = false;
        document.querySelector("#nextbutton").disabled = false;
    }

}