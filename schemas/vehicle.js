const z = require('zod')

const vehicleSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Invalid type string.'
  }),
  model: z.string(),
  year: z.number().int().min(2000).max(2024),
  description: z.string(),
  price: z.number().min(1000).max(500000),
  urlImage: z.string().url()
})

function validateVehicle (object) {
  return vehicleSchema.safeParse(object)
}

function updateVehicleAccept (object) {
  return vehicleSchema.partial().safeParse(object)
}

module.exports = {
  validateVehicle,
  updateVehicleAccept
}
