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
var recipesElement = document.getElementById("recipes");
var recipeElement = document.getElementById("recipe");

let categories = Object.keys(recipes);
let selected_category = categories[0];

let recipe_names = Object.keys(recipes[selected_category])
let selected_recipe = recipe_names[0];

const build_page = function(): void {
  // Clear existing elements and rebuild
  categoriesElement.innerHTML = "";
  recipesElement.innerHTML = "";
  recipeElement.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    const fragment = document.createDocumentFragment();
    const cat_element = fragment
    .appendChild(document.createElement("li"))
    cat_element.textContent = category;
    if (category == selected_category) {
      cat_element.classList.add("selected");
    }
    cat_element.classList.add("category");
    cat_element.onclick = () => {
      selected_category = category;

      recipe_names = Object.keys(recipes[selected_category]);
      selected_recipe = recipe_names[0];

      build_page();
    }
    categoriesElement.appendChild(cat_element);
  }

  console.log("Recipe names:");
  console.log(recipe_names);

  for (let i = 0; i < recipe_names.length; i++) {
    const recipe_name = recipe_names[i];
    
    const fragment = document.createDocumentFragment();
    const name_element = fragment
      .appendChild(document.createElement("li"))
    name_element.textContent = recipe_name;
    if (recipe_name == selected_recipe) {
      name_element.classList.add("selected");
    }
    name_element.classList.add("recipe_name");
    name_element.onclick = () => {
      selected_recipe = recipe_name;
      build_page();
    }
    recipesElement.appendChild(name_element);
  }

  const recipe_lines = recipes[selected_category][selected_recipe].split(/\r?\n/);
  for (let i = 0; i < recipe_lines.length; i++) {
    const line = recipe_lines[i];

    const fragment = document.createDocumentFragment();
    const line_element = fragment
      .appendChild(document.createElement("p"));
    line_element.textContent = line;
    recipeElement.appendChild(line_element);
  }
  // recipeElement.innerHTML = recipes[selected_category][selected_recipe];
}

build_page();
