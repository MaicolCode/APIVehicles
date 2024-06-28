import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { vehicleRouter } from './routes/vehicle.js'

export const createApp = ({ modelVehicle }) => {
  const PORT = process.env.PORT ?? 6675
  const app = express()

  app.disable('x-powered-by')
  app.use(json())
  app.use(corsMiddleware)
  app.use('/vehicles', vehicleRouter({ modelVehicle }))

  app.listen(PORT, () => {
    console.log(`Server listener in port http://localhost:${PORT}`)
  })
}
