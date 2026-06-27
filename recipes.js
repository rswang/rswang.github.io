/*
 * recipes.js — single source of truth for the baking section.
 *
 * TO ADD A NEW RECIPE:
 *   1. Drop a photo in images/recipes/ (square-ish photos look best as tiles).
 *   2. Add one entry to the `recipes` array below. Copy an existing one and edit.
 *      - id:      unique slug, used in the URL (recipe.html?id=<id>). letters/dashes only.
 *      - title:   recipe name shown on the tile and recipe page.
 *      - image:   path to the photo.
 *      - blurb:   short caption shown on the tile (optional).
 *      - story:   one string, or an array of strings (each becomes a paragraph). Optional.
 *      - ingredients: array of strings. Optional — omit for a notes-only entry.
 *      - steps:   array of strings. Optional — omit for a notes-only entry.
 *
 * That's it — the gallery and recipe pages render themselves from this data.
 */
const recipes = [
	{
		id: "banana-bread",
		title: "Banana Bread",
		image: "images/recipes/banana-bread.jpg",
		blurb: "The classic, for very ripe bananas",
		story: [
			"This is the recipe I reach for whenever there are bananas going brown on the counter. The spottier the better — they make the loaf sweeter and more moist.",
			"Write whatever you like here: the story behind the bake, tweaks you made, who you made it for."
		],
		ingredients: [
			"3 ripe bananas, mashed",
			"1/3 cup melted butter",
			"3/4 cup sugar",
			"1 egg, beaten",
			"1 tsp vanilla",
			"1 tsp baking soda",
			"Pinch of salt",
			"1 1/2 cups flour"
		],
		steps: [
			"Preheat oven to 175°C (350°F) and butter a loaf tin.",
			"Mix the mashed bananas with the melted butter.",
			"Stir in the sugar, egg, and vanilla, then the baking soda and salt.",
			"Fold in the flour until just combined.",
			"Pour into the tin and bake for 50–60 minutes, until a skewer comes out clean."
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
		'<h2 class="recipe-title">' + recipe.title + '</h2>' +
		'<img class="recipe-photo" src="' + recipe.image + '" alt="' + recipe.title + '">';

	var story = asParagraphs(recipe.story);
	if (story.length) {
		html += '<div class="recipe-story">' +
			story.map(function (p) { return '<p>' + p + '</p>'; }).join("") +
			'</div>';
	}

	if (recipe.ingredients && recipe.ingredients.length) {
		html += '<h3>Ingredients</h3><ul class="recipe-ingredients">' +
			recipe.ingredients.map(function (i) { return '<li>' + i + '</li>'; }).join("") +
			'</ul>';
	}

	if (recipe.steps && recipe.steps.length) {
		html += '<h3>Method</h3><ol class="recipe-steps">' +
			recipe.steps.map(function (s) { return '<li>' + s + '</li>'; }).join("") +
			'</ol>';
	}

	mount.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
	renderRecipeGrid();
	renderRecipePage();
});
