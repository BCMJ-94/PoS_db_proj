import express from 'express'

import { getIngredient, getIngredients, createIngredient } from '../database.js'
import isAuthorized from '../utils/auth.js'

const ingredientsRouter = express.Router()

ingredientsRouter.use(isAuthorized)

ingredientsRouter.get("/", async (req, res) => {
    try {
        const ingredients = await getIngredients()
        res.json(ingredients)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

ingredientsRouter.get("/:ingredientID", async (req, res) => {
    const ingredientID = req.params.ingredientID
    try {
        const ingredient = await getIngredient(ingredientID)

        if (!ingredient) {
            res.status(404).json({
                message: "Ingredient not found"
            })
        }

        res.send(ingredient)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

ingredientsRouter.post("/", async (req, res) => {
    const { ingredientID, _name, pricePerUnit, quantity } = req.body

    try {
        const ingredient = await createIngredient(ingredientID, _name, pricePerUnit, quantity)
        res.status(201).send(ingredient)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default ingredientsRouter