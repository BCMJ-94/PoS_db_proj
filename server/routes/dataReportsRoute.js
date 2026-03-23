import express from 'express'
import { getItemsSoldReport } from '../database.js'
import isAuthorized from '../utils/auth.js'

const dataReportsRouter = express.Router()
dataReportsRouter.use(isAuthorized)