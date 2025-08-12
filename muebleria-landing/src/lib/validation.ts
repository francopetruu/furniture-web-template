// lib/validations.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede superar 50 caracteres'),
  email: z.string()
    .email('Email inválido')
    .min(1, 'El email es requerido'),
  phone: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .regex(/^[+]?[0-9\s-()]+$/, 'Formato de teléfono inválido'),
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(500, 'El mensaje no puede superar 500 caracteres'),
  product_id: z.string().uuid().optional()
})

export type ContactFormData = z.infer<typeof contactFormSchema>