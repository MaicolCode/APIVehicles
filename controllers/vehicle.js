import { validateVehicle, updateVehicleAccept } from '../schemas/vehicle.js'
import { VehicleModel } from '../models/vehicle.js'
export class VehicleController {
  static async genAll (req, resp) {
    const { year } = req.query

    resp.json(await VehicleModel.getAll({ year }))
  }

  static async getById (req, resp) {
    const { id } = req.params
    const result = await VehicleModel.getById({ id })
    if (result) {
      return resp.json(result)
    } else {
      return resp.status(400).json({ message: "Vehicle id don't exist." })
    }
  }

  static async delete (req, resp) {
    const { id } = req.params

    const result = await VehicleModel.delete({ id })
    if (!result) return resp.status(400).json({ message: "Vehicle id don't exist." })

    return resp.status(200).json({ message: 'Vehicle deleted.' })
  }

  static async create (req, resp) {
    const acceptVehicle = validateVehicle(req.body)

    if (acceptVehicle.error) return resp.status(400).json({ message: JSON.parse(`${acceptVehicle.error}`) })

    return resp.status(201).json(await VehicleModel.create({ input: acceptVehicle.data }))
  }

  static async update (req, resp) {
    const result = updateVehicleAccept(req.body)
    if (result.error) return resp.status(400).json({ message: JSON.parse(`${result.error}`) })

    const { id } = req.params
    const response = await VehicleModel.update({ id, input: result.data })
    if (!response) return resp.status(400).json({ message: "Vehicle id don't exist." })

    return resp.json(response)
  }
}
