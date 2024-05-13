const recipe_filename = "./recipes.txt";

const load_file = function(filename: string): String {
  let fileContent: String = "";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", filename, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // const fileContent = xhr.responseText;
        fileContent = xhr.responseText;
      } else {
        console.error("Failed to load file");
      }
    }
  };
  xhr.send();
  return fileContent;
}

const file_content = load_file(recipe_filename);
const lines = file_content.split(/\r?\n/);
console.log(lines);

// let categories: String[] = [];

// let categories = ["Margaritas", "Cocktails", "Mocktails"];

let recipes = {};


var categoriesElement = document.getElementById("categories");
const fragment = document.createDocumentFragment();
const cat = fragment
    .appendChild(document.createElement("div"))
cat.textContent = "Thing";
categoriesElement.appendChild(cat)
