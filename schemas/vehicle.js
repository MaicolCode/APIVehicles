import { z } from 'zod'

const vehicleSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Invalid type string.'
  }),
  model: z.string(),
  year: z.number().int().min(2000).max(2024),
  description: z.string(),
  price: z.number().min(100.000).max(500.000),
  urlImage: z.string().url()
})

export function validateVehicle (object) {
  return vehicleSchema.safeParse(object)
}

export function updateVehicleAccept (object) {
  return vehicleSchema.partial().safeParse(object)
}
