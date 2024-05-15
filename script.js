var recipes_file = "recipes.txt";
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
var file_content = load_file(recipes_file);
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
    // categoriesElement.innerHTML = "";
    var _loop_1 = function (i) {
        var category = categories[i];
        var fragment = document.createDocumentFragment();
        var cat_element = fragment
            .appendChild(document.createElement("li"));
        cat_element.textContent = category;
        if (category == selected_category) {
            cat_element.classList.add("selected");
        }
        cat_element.classList.add("category");
        cat_element.classList.add("button");
        cat_element.onclick = function (e) {
            categoriesElement === null || categoriesElement === void 0 ? void 0 : categoriesElement.getElementsByClassName("selected")[0].classList.remove("selected");
            selected_category = category;
            var element = e.target;
            element.classList.add("selected");
            recipe_names = Object.keys(recipes[selected_category]);
            selected_recipe = recipe_names[0];
            recipesElement.scrollTop = 0;
            // build_page();
            build_recipes();
        };
        categoriesElement === null || categoriesElement === void 0 ? void 0 : categoriesElement.appendChild(cat_element);
    };
    for (var i = 0; i < categories.length; i++) {
        _loop_1(i);
    }
    // console.log("Recipe names:");
    // console.log(recipe_names);
    build_recipes();
    // recipeElement.innerHTML = recipes[selected_category][selected_recipe];
};
var build_recipes = function () {
    recipesElement.innerHTML = "";
    var _loop_2 = function (i) {
        var recipe_name = recipe_names[i];
        var fragment = document.createDocumentFragment();
        var name_element = fragment
            .appendChild(document.createElement("li"));
        name_element.textContent = recipe_name;
        if (recipe_name == selected_recipe) {
            name_element.classList.add("selected");
        }
        name_element.classList.add("recipe_button");
        name_element.classList.add("button");
        name_element.onclick = function (e) {
            recipesElement === null || recipesElement === void 0 ? void 0 : recipesElement.getElementsByClassName("selected")[0].classList.remove("selected");
            selected_recipe = recipe_name;
            var element = e.target;
            element.classList.add("selected");
            show_recipe();
        };
        recipesElement === null || recipesElement === void 0 ? void 0 : recipesElement.appendChild(name_element);
    };
    for (var i = 0; i < recipe_names.length; i++) {
        _loop_2(i);
    }
    show_recipe();
};
var show_recipe = function () {
    recipeElement.innerHTML = "";
    var recipe_lines = recipes[selected_category][selected_recipe].split(/\r?\n/);
    for (var i = 0; i < recipe_lines.length; i++) {
        var line = recipe_lines[i];
        var fragment = document.createDocumentFragment();
        var line_element = fragment
            .appendChild(document.createElement("p"));
        line_element.textContent = line;
        recipeElement === null || recipeElement === void 0 ? void 0 : recipeElement.appendChild(line_element);
    }
};
build_page();
var scroll_down = document.getElementById("scroll-down");
scroll_down === null || scroll_down === void 0 ? void 0 : scroll_down.addEventListener("click", function () {
    // recipesElement.scrollTop += 400;
    var scroll_amount = 400;
    var current_scroll = recipesElement.scrollTop;
    var target_scroll = current_scroll + scroll_amount;
    var duration = 200;
    var start_time = performance.now();
    function scroll_step(timestamp) {
        var elapsed = timestamp - start_time;
        var progress = Math.min(elapsed / duration, 1);
        recipesElement.scrollTop = current_scroll + (target_scroll - current_scroll) * progress;
        if (progress < 1) {
            requestAnimationFrame(scroll_step);
        }
    }
    requestAnimationFrame(scroll_step);
});
var scroll_up = document.getElementById("scroll-up");
scroll_up === null || scroll_up === void 0 ? void 0 : scroll_up.addEventListener("click", function () {
    // recipesElement.scrollTop -= 400;
    var scroll_amount = 400;
    var current_scroll = recipesElement.scrollTop;
    var target_scroll = current_scroll - scroll_amount;
    var duration = 200;
    var start_time = performance.now();
    function scroll_step(timestamp) {
        var elapsed = timestamp - start_time;
        var progress = Math.min(elapsed / duration, 1);
        recipesElement.scrollTop = current_scroll + (target_scroll - current_scroll) * progress;
        if (progress < 1) {
            requestAnimationFrame(scroll_step);
        }
    }
    requestAnimationFrame(scroll_step);
});
