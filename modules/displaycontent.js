'use strict'
/**
 * recipeSeachRoot Module.
 * @module recipeSearchRoot
 */
const request = require('request')
const globals = require('./globals')

 /**
 * Represents heading search, returns a specific selection of section.
 * @api {get} /recipes Request a list of the sections that match your search
 * @param {Object[]} req - The content that we request.
 * @param {Object[]} res- The sections that we send back.
 * @param {number} id- The id of the section.
 * @param {string} Headinge - The name of the section.
 * @param {string} Content - The name of the recipe.
 * @param {error} err - error returned.
 * @returns {Recipes} Returns the value of recipes.
 * @returns {rep} req- request param.
 */
exports.searchSection = function searchSection(req, res) {
	const q = req.query
	const url = `http://design.propcom.co.uk/buildtest/accordion-data.json?q=${q}`

	request.get(url, function(error, response, body) {
		if (!error && response.statusCode === globals.status.ok) {
			const results =JSON.parse(body).blocks
			const recipes = []

			for (let i = 0; i < results.length; i++) {

				const recipe = {
					Heading: results[i].heading,
					Content: results[i].content,
				}
				recipes.push(recipe)
			}res.send(recipes)
		} else {
			res.send(globals.status.notImplemented,{message: 'Problem with API query ',error: error, statusCode: response.statusCode})
		}
	})
}
