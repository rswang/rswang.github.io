/*
 * recipes.js — single source of truth for the baking section.
 *
 * TO ADD A NEW RECIPE:
 *   1. Drop a photo in images/recipes/ (square-ish photos look best as tiles).
 *   2. Add one entry to the `recipes` array below. Copy an existing one and edit.
 *      - id:      unique slug, used in the URL (recipe.html?id=<id>). letters/dashes only.
 *      - title:   recipe name shown on the tile and recipe page.
 *      - image:   path to the photo.
 *      - date:    date created, as "YYYY-MM-DD". Optional — shown under the title.
 *      - blurb:   short caption shown on the tile (optional).
 *      - story:   one string, or an array of strings (each becomes a paragraph). Optional.
 *      - ingredients: array of strings. Optional — omit for a notes-only entry.
 *      - steps:   array of strings. Optional — omit for a notes-only entry.
 *      - sources: array of { label, url } links to original recipes. Optional.
 *
 * That's it — the gallery and recipe pages render themselves from this data.
 */
const recipes = [
	{
		id: "pear-frangipane-tart",
		title: "Pear Frangipane Tart",
		image: "images/recipes/pear-frangipane-tart.jpg",
		date: "2026-06-27",
		blurb: "Almond cream + pears in a buttery crust",
		story: [
			"My mom's favorite dessert from our local French bakery. When it shut down, she asked me to learn how to make it, and it's become a staple ever since.",
			"It comes together from three simple parts: a press-in French tart shell, an almond frangipane, and a can of pear halves fanned on top. Don't fuss over the pears — even a rough fan looks lovely once it bakes up golden."
		],
		ingredients: [
			"— For the tart shell —",
			"90g unsalted butter, cut into pieces",
			"1 tbsp (15ml) vegetable oil",
			"3 tbsp (45ml) water",
			"1 tbsp (15g) sugar",
			"⅛ tsp salt",
			"150g flour",
			"— For the frangipane —",
			"85g unsalted butter, at room temperature",
			"100g sugar",
			"75g almond flour (ground almonds)",
			"2 tsp (6g) flour",
			"1 tsp (3g) cornstarch",
			"1 large egg",
			"¼ tsp vanilla extract",
			"2 tsp dark rum (optional)",
			"— To assemble —",
			"1 can pear halves (about 410g), drained well"
		],
		steps: [
			"Make the shell: Heat oven to 210°C (410°F). In an ovenproof bowl, combine the butter, oil, water, sugar, and salt. Bake about 15 minutes, until the butter is bubbling and just starting to brown at the edges.",
			"Carefully remove the bowl (it may sputter). Tip in the flour and stir quickly until it comes together into a smooth dough that pulls away from the sides.",
			"Spread the warm dough into a tart pan and let it cool a few minutes, then press evenly across the bottom and up the sides with a spoon or your fingers. Prick the base with a fork.",
			"Bake the shell about 15 minutes, until lightly golden. Reduce the oven to 180°C (350°F).",
			"Make the frangipane: Beat the butter until creamy, then beat in the sugar until smooth. Mix in the almond flour, then the flour and cornstarch, then the egg, vanilla, and rum. Beat just until combined — don't overwork once the egg is in.",
			"Assemble: Spread the frangipane evenly into the baked shell. Thinly slice each pear half crosswise, keeping the shape, and fan the slices on top in a spoke pattern.",
			"Bake at 180°C (350°F) for 50–60 minutes, until the frangipane is puffed, set, and deep golden. Cool before slicing."
		],
		sources: [
			{ label: "Tart dough — David Lebovitz", url: "https://www.davidlebovitz.com/french-tart-dough-a-la-francaise/" },
			{ label: "Frangipane — Smitten Kitchen", url: "https://smittenkitchen.com/2008/02/pear-and-almond-tart/" }
		]
	},
	{
		id: "banana-bread",
		title: "Banana Bread",
		image: "images/recipes/banana-bread.jpg",
		date: "2026-06-27",
		blurb: "A moist loaf for very ripe bananas",
		ingredients: [
			"113g unsalted butter, softened",
			"160g granulated sugar",
			"2 large eggs",
			"4 very ripe bananas, mashed",
			"187g flour",
			"1 tsp baking soda",
			"½ tsp salt"
		],
		steps: [
			"Heat oven to 175°C (350°F). Grease a 9x5-inch (23x13cm) loaf pan.",
			"Cream the butter and sugar until light. Beat in the eggs, then the mashed bananas.",
			"In a separate bowl, whisk together the flour, baking soda, and salt. Stir into the banana mixture just until combined.",
			"Pour into the pan and bake for 70 minutes, until a toothpick inserted in the center comes out clean. Cool before slicing."
		],
		sources: [
			{ label: "Best Banana Bread — Food.com", url: "https://www.food.com/recipe/best-banana-bread-2886" }
		]
	}
];

/* ------------------------------------------------------------------ *
 * Rendering — you shouldn't need to touch anything below this line.  *
 * ------------------------------------------------------------------ */

function recipeById(id) {
	return recipes.find(function (r) { return r.id === id; });
}

function asParagraphs(story) {
	if (!story) return [];
	return Array.isArray(story) ? story : [story];
}

// Turns "2026-06-27" into "June 27, 2026" without timezone surprises.
function formatDate(iso) {
	if (!iso) return "";
	var parts = iso.split("-");
	if (parts.length !== 3) return iso;
	var months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	var month = months[parseInt(parts[1], 10) - 1];
	if (!month) return iso;
	return month + " " + parseInt(parts[2], 10) + ", " + parts[0];
}

// Renders the tile grid into the element with id="recipe-grid".
function renderRecipeGrid() {
	var grid = document.getElementById("recipe-grid");
	if (!grid) return;

	if (!recipes.length) {
		grid.innerHTML = '<p class="empty-note">No recipes yet — check back soon!</p>';
		return;
	}

	grid.innerHTML = recipes.map(function (r) {
		var blurb = r.blurb ? '<span class="tile-blurb">' + r.blurb + '</span>' : '';
		return '' +
			'<a class="recipe-tile" href="recipe.html?id=' + encodeURIComponent(r.id) + '">' +
				'<div class="tile-image" style="background-image:url(\'' + r.image + '\')"></div>' +
				'<div class="tile-caption">' +
					'<span class="tile-title">' + r.title + '</span>' +
					blurb +
				'</div>' +
			'</a>';
	}).join("");
}

// Renders a single recipe into the element with id="recipe". Reads ?id= from the URL.
function renderRecipePage() {
	var mount = document.getElementById("recipe");
	if (!mount) return;

	var params = new URLSearchParams(window.location.search);
	var recipe = recipeById(params.get("id"));

	if (!recipe) {
		document.title = "Recipe not found";
		mount.innerHTML =
			'<p class="empty-note">Sorry, we couldn\'t find that recipe. ' +
			'<a href="baking.html">Back to all bakes</a>.</p>';
		return;
	}

	document.title = recipe.title;

	var html = '' +
		'<a class="back-link" href="baking.html">&larr; All bakes</a>' +
		'<h2 class="recipe-title">' + recipe.title + '</h2>';

	if (recipe.date) {
		html += '<p class="recipe-date">' + formatDate(recipe.date) + '</p>';
	}

	html += '<img class="recipe-photo" src="' + recipe.image + '" alt="' + recipe.title + '">';

	var story = asParagraphs(recipe.story);
	if (story.length) {
		html += '<div class="recipe-story">' +
			story.map(function (p) { return '<p>' + p + '</p>'; }).join("") +
			'</div>';
	}

	if (recipe.ingredients && recipe.ingredients.length) {
		html += '<h3>Ingredients</h3><ul class="recipe-ingredients">' +
			recipe.ingredients.map(function (i) {
				// A line wrapped in em-dashes (— ... —) is a section header, not an item.
				var header = i.match(/^—\s*(.*?)\s*—$/);
				return header
					? '<li class="ingredient-group">' + header[1] + '</li>'
					: '<li>' + i + '</li>';
			}).join("") +
			'</ul>';
	}

	if (recipe.steps && recipe.steps.length) {
		html += '<h3>Method</h3><ol class="recipe-steps">' +
			recipe.steps.map(function (s) { return '<li>' + s + '</li>'; }).join("") +
			'</ol>';
	}

	if (recipe.sources && recipe.sources.length) {
		html += '<div class="recipe-sources"><h3>Adapted from</h3><ul>' +
			recipe.sources.map(function (s) {
				return '<li><a href="' + s.url + '" target="_blank" rel="noopener">' + s.label + '</a></li>';
			}).join("") +
			'</ul></div>';
	}

	mount.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
	renderRecipeGrid();
	renderRecipePage();
});
