const recipe_filename = "./recipes.txt";

// Open file
const xhr = new XMLHttpRequest();
xhr.open("GET", recipe_filename, true);
xhr.onreadystatechange = () => {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      const fileContent = xhr.responseText;
      console.log(fileContent);
    } else {
      console.error("Failed to load file");
    }
  }
};
console.log("Before thing");
xhr.send();

// let categories: String[] = [];

// let categories = ["Margaritas", "Cocktails", "Mocktails"];

let recipes = {};


var categoriesElement = document.getElementById("categories");
const fragment = document.createDocumentFragment();
const cat = fragment
    .appendChild(document.createElement("div"))
cat.textContent = "Thing";
categoriesElement.appendChild(cat)
