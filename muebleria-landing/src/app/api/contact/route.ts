// app/api/contact/route.ts
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { envServer } from '@/lib/env-server'
import nodemailer from 'nodemailer'
import type { Database } from '@/types/database'

// Configurar transporter de email
const transporter = nodemailer.createTransport({
  host: envServer.email.host,
  port: envServer.email.port,
  secure: false,
  auth: {
    user: envServer.email.user,
    pass: envServer.email.pass,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar datos
    const validatedData = contactFormSchema.parse(body) as ContactFormData

    // Cliente admin para evitar RLS en inserts
    const supabaseAdmin = getSupabaseAdmin()

    // Guardar en base de datos con service key
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
      console.error('Database error (admin insert):', dbError)
      return NextResponse.json(
        { error: 'Error al guardar la consulta' },
        { status: 500 }
      )
    }

    // Enviar emails (best-effort)
    try {
      // Email de notificación
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

      // Email de confirmación al cliente
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
      console.warn('Email error (continuing):', err?.code, err?.message)
    }

    return NextResponse.json({
      success: true,
      message: 'Consulta enviada exitosamente',
      inquiryId: inquiry.id,
    })
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Datos del formulario inválidos' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Opcional: responder a OPTIONS para evitar 405 en preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}