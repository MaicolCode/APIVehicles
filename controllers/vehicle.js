import { validateVehicle, updateVehicleAccept } from '../schemas/vehicle.js'

export class VehicleController {
  // eslint-disable-next-line space-before-function-paren
  constructor(vehicleModel) {
    this.vehicleModel = vehicleModel
  }

  getAll = async (req, resp) => {
    const { year } = req.query

    resp.json(await this.vehicleModel.getAll({ year }))
  }

  getById = async (req, resp) => {
    const { id } = req.params
    const result = await this.vehicleModel.getById({ id })
    if (result) {
      return resp.json(result)
    } else {
      return resp.status(400).json({ message: "Vehicle id don't exist." })
    }
  }

  delete = async (req, resp) => {
    const { id } = req.params

    const result = await this.vehicleModel.delete({ id })
    if (!result) {
      return resp.status(400).json({ message: "Vehicle id don't exist." })
    }

    return resp.status(200).json({ message: 'Vehicle deleted.' })
  }

  create = async (req, resp) => {
    const acceptVehicle = validateVehicle(req.body)

    if (acceptVehicle.error) {
      return resp
        .status(400)
        .json({ message: JSON.parse(`${acceptVehicle.error}`) })
    }

    return resp
      .status(201)
      .json(await this.vehicleModel.create({ input: acceptVehicle.data }))
  }

  update = async (req, resp) => {
    const result = updateVehicleAccept(req.body)
    if (result.error) {
      return resp.status(400).json({ message: JSON.parse(`${result.error}`) })
    }

    const { id } = req.params
    const response = await this.vehicleModel.update({ id, input: result.data })
    if (!response) {
      return resp.status(400).json({ message: "Vehicle id don't exist." })
    }

    return resp.json(response)
  }
}
