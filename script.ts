const recipes_file = "recipes.txt";

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

const file_content = load_file(recipes_file);
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
  // categoriesElement.innerHTML = "";

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
    cat_element.classList.add("button");
    cat_element.onclick = (e) => {
      categoriesElement?.getElementsByClassName("selected")[0].classList.remove("selected");
      selected_category = category;
      const element = e.target as HTMLElement;
      element.classList.add("selected");

      recipe_names = Object.keys(recipes[selected_category]);
      selected_recipe = recipe_names[0];
      recipesElement.scrollTop = 0;

      // build_page();
      build_recipes();
    }
    categoriesElement?.appendChild(cat_element);
  }

  // console.log("Recipe names:");
  // console.log(recipe_names);

  build_recipes();

  // recipeElement.innerHTML = recipes[selected_category][selected_recipe];
}

const build_recipes = function() {
  recipesElement.innerHTML = "";

  for (let i = 0; i < recipe_names.length; i++) {
    const recipe_name = recipe_names[i];
    
    const fragment = document.createDocumentFragment();
    const name_element = fragment
      .appendChild(document.createElement("li"))
    name_element.textContent = recipe_name;
    if (recipe_name == selected_recipe) {
      name_element.classList.add("selected");
    }
    name_element.classList.add("recipe_button");
    name_element.classList.add("button");
    name_element.onclick = (e) => {
      recipesElement?.getElementsByClassName("selected")[0].classList.remove("selected");
      selected_recipe = recipe_name;
      const element = e.target as HTMLElement;
      element.classList.add("selected");

      show_recipe();
    }
    recipesElement?.appendChild(name_element);
  }

  show_recipe();
}

const show_recipe = function() {
  recipeElement.innerHTML = "";

  const recipe_lines = recipes[selected_category][selected_recipe].split(/\r?\n/);
  for (let i = 0; i < recipe_lines.length; i++) {
    const line = recipe_lines[i];

    const fragment = document.createDocumentFragment();
    const line_element = fragment
      .appendChild(document.createElement("p"));
    line_element.textContent = line;
    recipeElement?.appendChild(line_element);
  }
}

build_page();

const scroll_down = document.getElementById("scroll-down");
scroll_down?.addEventListener("click", function() {
  // recipesElement.scrollTop += 400;

  const scroll_amount = 350;
  const current_scroll = recipesElement.scrollTop;
  const target_scroll = current_scroll + scroll_amount;
  const duration = 200;

  const start_time = performance.now();

  function scroll_step(timestamp) {
    const elapsed = timestamp - start_time;
    const progress = Math.min(elapsed / duration, 1);
    recipesElement.scrollTop = current_scroll + (target_scroll - current_scroll) * progress;

    if (progress < 1) {
      requestAnimationFrame(scroll_step);
    }
  }

  requestAnimationFrame(scroll_step);
})

const scroll_up = document.getElementById("scroll-up");
scroll_up?.addEventListener("click", function() {
  // recipesElement.scrollTop -= 400;

  const scroll_amount = 350;
  const current_scroll = recipesElement.scrollTop;
  const target_scroll = current_scroll - scroll_amount;
  const duration = 200;

  const start_time = performance.now();

  function scroll_step(timestamp) {
    const elapsed = timestamp - start_time;
    const progress = Math.min(elapsed / duration, 1);
    recipesElement.scrollTop = current_scroll + (target_scroll - current_scroll) * progress;

    if (progress < 1) {
      requestAnimationFrame(scroll_step);
    }
  }

  requestAnimationFrame(scroll_step);
})
