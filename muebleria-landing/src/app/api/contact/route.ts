// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
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

    // Intentar guardar en base de datos
    let inquiry: Database['public']['Tables']['inquiries']['Row'] | { id: string } | null = null
    try {
      console.log('Attempting to save to database:', validatedData)

      const insertData: Database['public']['Tables']['inquiries']['Insert'] = {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        product_id: validatedData.product_id ?? null,
        status: 'new',
      }

      const { data, error: dbError } = await supabase
        .from('inquiries')
        .insert([insertData])
        .select()
        .single<Database['public']['Tables']['inquiries']['Row']>()

      if (dbError) {
        console.error('Database error details:', dbError)
        console.error('Error code:', dbError.code)
        console.error('Error message:', dbError.message)
        console.error('Error details:', dbError.details)
        console.error('Error hint:', dbError.hint)
        inquiry = { id: `temp-${Date.now()}` }
      } else {
        console.log('Successfully saved to database:', data)
        inquiry = data
      }
    } catch (error) {
      console.error('Database connection error:', error)
      inquiry = { id: `temp-${Date.now()}` }
    }

    // Enviar emails
    try {
      console.log('Email configuration check:')
      console.log('Host:', envServer.email.host)
      console.log('Port:', envServer.email.port)
      console.log('User:', envServer.email.user ? 'Configured' : 'NOT SET')
      console.log('Pass:', envServer.email.pass ? 'Configured' : 'NOT SET')

      // Email de notificación
      const emailHtml = `
        <h2>Nueva consulta desde la web</h2>
        <p><strong>Nombre:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Teléfono:</strong> ${validatedData.phone}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        
        ${validatedData.product_id ? `
          <p><strong>Producto consultado:</strong> ID ${validatedData.product_id}</p>
        ` : ''}
        
        <hr>
        <p><small>Consulta recibida el ${new Date().toLocaleString('es-AR')}</small></p>
      `

      console.log('Sending notification email...')
      await transporter.sendMail({
        from: envServer.email.user,
        to: envServer.email.user, // Enviar a tu propio email
        subject: `Nueva consulta: ${validatedData.name}`,
        html: emailHtml,
      })
      console.log('Notification email sent successfully')

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

      console.log('Sending confirmation email to user...')
      await transporter.sendMail({
        from: envServer.email.user,
        to: validatedData.email,
        subject: 'Confirmación de consulta recibida',
        html: confirmationHtml,
      })
      console.log('Confirmation email sent successfully')
    } catch (emailError: unknown) {
      const err = emailError as { message?: string; code?: string }
      console.error('Email error details:', emailError)
      console.error('Email error message:', err?.message)
      console.error('Email error code:', err?.code)
      // Continuar sin enviar emails si hay error
      console.warn('Continuing without sending emails')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Consulta enviada exitosamente',
      inquiryId: inquiry?.id ?? null,
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