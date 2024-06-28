import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { routerVehicle } from './routes/vehicle.js'

const PORT = process.env.PORT ?? 6675
const app = express()

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware)
app.use('/vehicles', routerVehicle)

app.listen(PORT, () => {
  console.log(`Server listener in port http://localhost:${PORT}`)
})
