import type { NextApiRequest, NextApiResponse } from 'next'
import { getSupabaseAdmin } from '@/lib/supabase'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { envServer } from '@/lib/env-server'
import nodemailer from 'nodemailer'
import type { Database } from '@/types/database'

export const config = {
  api: {
    bodyParser: true,
  },
}

const transporter = nodemailer.createTransport({
  host: envServer.email.host,
  port: envServer.email.port,
  secure: false,
  auth: {
    user: envServer.email.user,
    pass: envServer.email.pass,
  },
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const body = req.body as unknown
    const validatedData = contactFormSchema.parse(body) as ContactFormData

    const supabaseAdmin = getSupabaseAdmin()

    const insertData: Database['public']['Tables']['inquiries']['Insert'] = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
      product_id: validatedData.product_id ?? null,
      status: 'new',
    }

    const { data: inquiry, error: dbError } = await supabaseAdmin
      .from('inquiries')
      .insert([insertData])
      .select()
      .single<Database['public']['Tables']['inquiries']['Row']>()

    if (dbError) {
      console.error('Database error (pages api):', dbError)
      return res.status(500).json({ error: 'Error al guardar la consulta' })
    }

    try {
      const emailHtml = `
        <h2>Nueva consulta desde la web</h2>
        <p><strong>Nombre:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Teléfono:</strong> ${validatedData.phone}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        ${validatedData.product_id ? `<p><strong>Producto consultado:</strong> ID ${validatedData.product_id}</p>` : ''}
        <hr>
        <p><small>Consulta recibida el ${new Date().toLocaleString('es-AR')}</small></p>
      `

      await transporter.sendMail({
        from: `Mueblería Familiar <${envServer.email.user}>`,
        to: envServer.email.user,
        subject: `Nueva consulta: ${validatedData.name}`,
        html: emailHtml,
      })

      const confirmationHtml = `
        <h2>¡Gracias por tu consulta!</h2>
        <p>Hola ${validatedData.name},</p>
        <p>Hemos recibido tu consulta y nos pondremos en contacto contigo a la brevedad.</p>
        <h3>Resumen de tu consulta:</h3>
        <p><strong>Mensaje:</strong> ${validatedData.message}</p>
        <p>Nos comunicaremos contigo por teléfono (${validatedData.phone}) o email en las próximas 24 horas.</p>
        <p>¡Gracias por elegirnos!</p>
        <p><strong>Mueblería Familiar</strong></p>
      `

      await transporter.sendMail({
        from: `Mueblería Familiar <${envServer.email.user}>`,
        to: validatedData.email,
        subject: 'Confirmación de consulta recibida',
        html: confirmationHtml,
      })
    } catch (emailError: unknown) {
      const err = emailError as { message?: string; code?: string }
      console.warn('Email error (pages api, continuing):', err?.code, err?.message)
    }

    return res.status(200).json({ success: true, message: 'Consulta enviada exitosamente', inquiryId: inquiry.id })
  } catch (error: unknown) {
    console.error('Contact form error (pages api):', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
