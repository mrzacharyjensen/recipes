var recipe_filename = "./recipes.txt";
// Open file
var xhr = new XMLHttpRequest();
xhr.open("GET", recipe_filename, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            var fileContent = xhr.responseText;
            console.log(fileContent);
        }
        else {
            console.error("Failed to load file");
        }
    }
};
xhr.send();
// let categories: String[] = [];
// let categories = ["Margaritas", "Cocktails", "Mocktails"];
var recipes = {};
var categoriesElement = document.getElementById("categories");
var fragment = document.createDocumentFragment();
var cat = fragment
    .appendChild(document.createElement("div"));
cat.textContent = "Thing";
categoriesElement.appendChild(cat);
