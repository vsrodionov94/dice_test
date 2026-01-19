import express from 'express'
import cors from 'cors'
import handlers from './handlers.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use('/', handlers)

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`)
})
