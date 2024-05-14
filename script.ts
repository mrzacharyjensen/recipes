const filename = "recipes.txt";

const load_file = function(filename: string): String {
  let fileContent: String = "blank";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", filename, false);
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

const parse_file = function(file_content: String): Object {
  const lines = file_content.split(/\r?\n/);
  let recipes = {};
  let current_category = "";
  let current_recipe_name = "";
  let current_recipe = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // if (line.slice(0,2) == "##") {
    //   current_category = line.slice(3);
    // } else if (line.slice(0,2) == "# ") {
    //   current_recipe_name = line.slice(2);
    // }
    switch (line.slice(0,2))   {
      case "##":
        if (current_category != "") {
        recipes[current_category][current_recipe_name] = current_recipe;
        current_recipe = "";
        current_recipe_name = "";
      }
      current_category = line.slice(3);
      recipes[current_category] = {};
      break;
      case "# ":
        if (current_recipe_name != "") {
        recipes[current_category][current_recipe_name] = current_recipe;
        current_recipe = "";
      }
      current_recipe_name = line.slice(2);
      break;
      case "":
        break;
      default:
        current_recipe += line + '\n';
      break;
    }
  }
  recipes[current_category][current_recipe_name] = current_recipe;
  
  return recipes;
}

const file_content = load_file(filename);
const recipes = parse_file(file_content);

console.log(recipes);

var categoriesElement = document.getElementById("categories");
// const fragment = document.createDocumentFragment();
// const cat = fragment
//     .appendChild(document.createElement("li"))
// cat.textContent = "Thing";
// categoriesElement.appendChild(cat)

let categories = Object.keys(recipes);
for (let i = 0; i < categories.length; i++) {
  const category = categories[i];
  
  const fragment = document.createDocumentFragment();
  const cat_element = fragment
    .appendChild(document.createElement("li"))
  cat_element.textContent = category;
  categoriesElement.appendChild(cat_element)
}
