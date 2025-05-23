import { Router } from 'express'
import { VehicleController } from '../controllers/vehicle.js'
import path from 'path'
import { __dirname } from '../utils/dirname.js'

export const vehicleRouter = ({ modelVehicle }) => {
  const vehicleController = new VehicleController(modelVehicle)

  const routerVehicle = Router()

  routerVehicle.get('/all', vehicleController.getAll)

  routerVehicle.get('/:id', vehicleController.getById)

  routerVehicle.delete('/:id', vehicleController.delete)

  routerVehicle.post('/create', vehicleController.create)

  routerVehicle.patch('/:id', vehicleController.update)

  routerVehicle.get('/web/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../web', req.params.filename)
    res.sendFile(filePath)
  })

  return routerVehicle
}
