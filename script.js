var filename = "recipes.txt";
var load_file = function (filename) {
    var fileContent = "blank";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, false);
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
var parse_file = function (file_content) {
    var lines = file_content.split(/\r?\n/);
    var recipes = {};
    var current_category = "";
    var current_recipe_name = "";
    var current_recipe = "";
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        switch (line.slice(0, 2)) {
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
};
var file_content = load_file(filename);
var recipes = parse_file(file_content);
console.log(recipes);
var categoriesElement = document.getElementById("categories");
var recipesElement = document.getElementById("recipes");
var recipeElement = document.getElementById("recipe");
var categories = Object.keys(recipes);
var selected_category = categories[0];
var recipe_names = Object.keys(recipes[selected_category]);
var selected_recipe = recipe_names[0];
var build_page = function () {
    // Clear existing elements and rebuild
    categoriesElement.innerHTML = "";
    recipesElement.innerHTML = "";
    recipeElement.innerHTML = "";
    var _loop_1 = function (i) {
        var category = categories[i];
        var fragment = document.createDocumentFragment();
        var cat_element = fragment
            .appendChild(document.createElement("li"));
        cat_element.textContent = category;
        if (category == selected_category) {
            cat_element.classList.add("selected");
        }
        cat_element.onclick = function () {
            selected_category = category;
            recipe_names = Object.keys(recipes[selected_category]);
            selected_recipe = recipe_names[0];
            build_page();
        };
        categoriesElement.appendChild(cat_element);
    };
    for (var i = 0; i < categories.length; i++) {
        _loop_1(i);
    }
    console.log("Recipe names:");
    console.log(recipe_names);
    var _loop_2 = function (i) {
        var recipe_name = recipe_names[i];
        var fragment = document.createDocumentFragment();
        var name_element = fragment
            .appendChild(document.createElement("li"));
        name_element.textContent = recipe_name;
        if (recipe_name == selected_recipe) {
            name_element.classList.add("selected");
        }
        name_element.onclick = function () {
            selected_recipe = recipe_name;
            build_page();
        };
        recipesElement.appendChild(name_element);
    };
    for (var i = 0; i < recipe_names.length; i++) {
        _loop_2(i);
    }
    var recipe_lines = recipes[selected_category][selected_recipe].split(/\r?\n/);
    for (var i = 0; i < recipe_lines.length; i++) {
        var line = recipe_lines[i];
        var fragment = document.createDocumentFragment();
        var line_element = fragment
            .appendChild(document.createElement("p"));
        line_element.textContent = line;
        recipeElement.appendChild(line_element);
    }
    // recipeElement.innerHTML = recipes[selected_category][selected_recipe];
};
build_page();
