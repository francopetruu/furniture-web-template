// Script de prueba para verificar conexión a Supabase
// Ejecutar con: node test-supabase.js

require('dotenv').config({ path: './env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_SERVICE_KEY

console.log('🔍 Probando conexión a Supabase...\n')

// Verificar variables
console.log('Variables de ambiente:')
console.log('URL:', supabaseUrl ? 'Configurada' : '❌ FALTA')
console.log('Anon Key:', supabaseKey ? 'Configurada' : '❌ FALTA')
console.log('Service Key:', serviceKey ? 'Configurada' : '❌ FALTA')
console.log('')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de Supabase no configuradas')
  process.exit(1)
}

// Cliente anónimo (RLS aplica)
const supabase = createClient(supabaseUrl, supabaseKey)
// Cliente admin (sin RLS)
const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : null

async function testConnection() {
  try {
    console.log('📊 Probando lectura de tabla inquiries (anon)...')
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .limit(1)

    if (error) {
      console.error('❌ Error leyendo tabla:', error.message)
      console.error('Código:', error.code)
      console.error('Detalles:', error.details)
    } else {
      console.log('✅ Lectura exitosa. Registros encontrados:', data?.length || 0)
    }

    console.log('\n💾 Probando inserción en tabla inquiries...')
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      message: 'Test message from Node.js script',
      status: 'new'
    }

    if (!supabaseAdmin) {
      console.warn('⚠️ No hay Service Key configurada. Intentando inserción con anon key (probable RLS 42501)...')
      const { data: insertData, error: insertError } = await supabase
        .from('inquiries')
        .insert([testData])
        .select()
        .single()

      if (insertError) {
        console.error('❌ Error insertando (esperado con RLS):', insertError.message)
        console.error('Código:', insertError.code)
        console.error('Detalles:', insertError.details)
        console.error('Hint:', insertError.hint)
      } else {
        console.log('✅ Inserción exitosa con anon (políticas RLS permiten INSERT). ID:', insertData.id)
        // Limpieza con anon si fue permitido
        await supabase.from('inquiries').delete().eq('id', insertData.id)
        console.log('🧹 Registro de prueba eliminado')
      }
    } else {
      // Usar service key para evitar RLS en insert/delete
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from('inquiries')
        .insert([testData])
        .select()
        .single()

      if (insertError) {
        console.error('❌ Error insertando con service key:', insertError.message)
        console.error('Código:', insertError.code)
        console.error('Detalles:', insertError.details)
        console.error('Hint:', insertError.hint)
      } else {
        console.log('✅ Inserción exitosa con service key. ID:', insertData.id)
        // Limpiar - eliminar el registro de prueba con service key
        await supabaseAdmin
          .from('inquiries')
          .delete()
          .eq('id', insertData.id)
        console.log('🧹 Registro de prueba eliminado')
      }
    }
  } catch (error) {
    console.error('❌ Error general:', error.message)
  }
}

if (serviceKey) {
  console.log('\n🔑 Probando lectura con Service Key...')
  supabaseAdmin
    .from('inquiries')
    .select('count')
    .then(({ data, error }) => {
      if (error) {
        console.error('❌ Service key error:', error.message)
      } else {
        console.log('✅ Service key funciona correctamente')
      }
    })
    .catch(err => console.error('❌ Service key connection error:', err.message))
}

testConnection()
