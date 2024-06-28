import { Router } from 'express'
import { VehicleController } from '../controllers/vehicle.js'

export const routerVehicle = Router()

routerVehicle.get('/', VehicleController.genAll)

routerVehicle.get('/:id', VehicleController.getById)

routerVehicle.delete('/:id', VehicleController.delete)

routerVehicle.post('/', VehicleController.create)

routerVehicle.patch('/:id', VehicleController.update)
