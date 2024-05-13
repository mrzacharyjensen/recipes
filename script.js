var recipe_filename = "./recipes.txt";
var load_file = function (filename) {
    var fileContent = "";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // const fileContent = xhr.responseText;
                fileContent = xhr.responseText;
            }
            else {
                console.error("Failed to load file");
            }
        }
    };
    xhr.send();
    return fileContent;
};
var file_content = load_file(recipe_filename);
var lines = file_content.split(/\r?\n/);
console.log(lines);
// let categories: String[] = [];
// let categories = ["Margaritas", "Cocktails", "Mocktails"];
var recipes = {};
var categoriesElement = document.getElementById("categories");
var fragment = document.createDocumentFragment();
var cat = fragment
    .appendChild(document.createElement("div"));
cat.textContent = "Thing";
categoriesElement.appendChild(cat);
