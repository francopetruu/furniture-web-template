// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { contactFormSchema } from '@/lib/validations'
import nodemailer from 'nodemailer'

// Configurar transporter de email
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos
    const validatedData = contactFormSchema.parse(body)
    
    // Guardar en base de datos
    const { data: inquiry, error: dbError } = await supabase
      .from('inquiries')
      .insert([validatedData])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Error al guardar la consulta' }, 
        { status: 500 }
      )
    }

    // Enviar email de notificación
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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Enviar a tu propio email
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
      from: process.env.EMAIL_USER,
      to: validatedData.email,
      subject: 'Confirmación de consulta recibida',
      html: confirmationHtml,
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Consulta enviada exitosamente',
      inquiryId: inquiry.id 
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