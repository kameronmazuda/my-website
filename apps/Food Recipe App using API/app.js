const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDeatailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

// ### EVENTS ### // (one more btn event after html is added to doc)

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    mealDeatailsContent.parentElement.classList.remove("showRecipe");
});


// ### FUNCTIONS ### //

function getMealList() {
    // EMPTY THE LIST 
    mealList.innerHTML = "";

    // get input
    let searchInputTxt = document.getElementById("search-input").value.trim();    
    // access api and display html
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = '';
            if(data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id="${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                    `
                })
            } else {
                html = "<h3>Sorry, can't find any matches.</h3>";
            }
            // add html to the page
            mealList.insertAdjacentHTML("beforeend", html)
        });
}

function getMealRecipe(ev) {
    ev.preventDefault();
    if(ev.target.classList.contains("recipe-btn")){
        let mealItem = ev.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then((response) => response.json())
            .then((data) => mealRecipeModal(data.meals))    
    }  
} 

function mealRecipeModal(meal) {
    const currentMeal = meal[0];
    
    // create a recipe modal html
        const html = `
    <h2 class = "recipe-title">${currentMeal.strMeal}</h2>
    <p class = "recipe-category">${currentMeal.strCategory}</p>
    <div class = "recipe-instruct">
      <h3>Instructions:</h3>
      <p>${currentMeal.strInstructions}</p>
    </div>
    <div class = "recipe-meal-img">
      <img src = "${currentMeal.strMealThumb}" alt = "${currentMeal.strMeal}">
    </div>
    <div class = "recipe-link">
      <a href = "${currentMeal.strYoutube}" target = "_blank">Watch Video</a>
    </div>
    `;

    // ADD HTML TO DOC
    mealDeatailsContent.innerHTML = html;
    mealDeatailsContent.parentElement.classList.add("showRecipe");
}


