import express from 'express'

import { getRecipe, getRecipes, createRecipe } from '../database.js'
import isAuthorized from '../utils/auth.js'

const recipesRouter = express.Router()

recipesRouter.use(isAuthorized)

recipesRouter.get("/", async (req, res) => {
    try {
        const recipes = await getRecipes()
        res.json(recipes)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

recipesRouter.get("/:recipeID", async (req, res) => {
    const recipeID = req.params.recipeID
    try {
        const recipe = await getRecipe(recipeID)

        if (!recipe) {
            res.status(404).json({
                message: "Recipe not found"
            })
        }

        res.send(recipe)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

recipesRouter.post("/", async (req, res) => {
    const { recipeID, ingredientID, finishedProductID, intermediateProductID } = req.body

    try {
        const recipe = await createRecipe(recipeID, ingredientID, finishedProductID, intermediateProductID)
        res.status(201).send(recipe)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default recipesRouter