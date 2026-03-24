import express from 'express'

import { getSection, getSections, createSection } from '../database.js'
import isAuthorized from '../utils/auth.js'

const sectionsRouter = express.Router()

sectionsRouter.use(isAuthorized)

sectionsRouter.get("/", async (req, res) => {
    try {
        const sections = await getSection()
        res.json(sections)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

sectionsRouter.get("/:sectionID", async (req, res) => {
    const sectionID = req.params.sectionID
    try {
        const section = await getSections(sectionID)

        if (!section) {
            res.status(404).json({
                message: "Section not found"
            })
        }

        res.send(section)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

sectionsRouter.post("/", async (req, res) => {
    const { employeeID } = req.body

    try {
        const section = await createSection(employeeID)
        res.status(201).send(section)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default sectionsRouter