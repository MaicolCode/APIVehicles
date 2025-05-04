import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { vehicleRouter } from './routes/vehicle.js'
import { __dirname } from './utils/dirname.js'
import { join } from 'path'

export const createApp = ({ modelVehicle }) => {
  const PORT = process.env.PORT ?? 6675
  const app = express()
  app.use(express.static(join(__dirname, '../web/public')))
  app.disable('x-powered-by')
  app.use(json())
  app.use(corsMiddleware)
  app.use(express.static('styles'))
  app.use('/vehicles', vehicleRouter({ modelVehicle }))

  app.listen(PORT, () => {
    console.log(`Server listener in port http://localhost:${PORT}`)
  })
}
