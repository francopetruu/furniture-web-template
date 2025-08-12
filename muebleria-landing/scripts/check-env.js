#!/usr/bin/env node

/**
 * Script para validar las variables de ambiente
 * Ejecutar con: node scripts/check-env.js
 */

require('dotenv').config({ path: './env.local' })

// Usar colores ANSI simples
const chalk = {
  redText: (text) => `\x1b[31m${text}\x1b[0m`,
  greenText: (text) => `\x1b[32m${text}\x1b[0m`,
  yellowText: (text) => `\x1b[33m${text}\x1b[0m`,
  grayText: (text) => `\x1b[90m${text}\x1b[0m`,
  whiteText: (text) => `\x1b[37m${text}\x1b[0m`,
  blue: { 
    bold: (text) => `\x1b[34m\x1b[1m${text}\x1b[0m`
  },
  white: { 
    bold: (text) => `\x1b[37m\x1b[1m${text}\x1b[0m`
  },
  red: { 
    bold: (text) => `\x1b[31m\x1b[1m${text}\x1b[0m`
  },
  green: { 
    bold: (text) => `\x1b[32m\x1b[1m${text}\x1b[0m`
  },
}

// Los métodos .bold están disponibles como chalk.green.bold, chalk.red.bold, etc.

// Variables requeridas
const REQUIRED_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_KEY',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_USER',
  'EMAIL_PASS',
]

// Variables opcionales
const OPTIONAL_VARS = [
  'NEXT_PUBLIC_WHATSAPP_PHONE',
  'NEXT_PUBLIC_GA_ID',
  'NODE_ENV'
]

function checkEnvVar(varName, isRequired = true) {
  const value = process.env[varName]
  const hasValue = Boolean(value && value.length > 0)
  
  if (isRequired) {
    if (hasValue) {
      console.log(chalk.greenText(`✅ ${varName}: OK`))
      return true
    } else {
      console.log(chalk.redText(`❌ ${varName}: MISSING (requerida)`))
      return false
    }
  } else {
    if (hasValue) {
      console.log(chalk.yellowText(`⚠️  ${varName}: OK (opcional)`))
    } else {
      console.log(chalk.grayText(`⏸️  ${varName}: Not set (opcional)`))
    }
    return true
  }
}

function main() {
  console.log(chalk.blue.bold('\n🔍 Validando Variables de Ambiente\n'))
  
  let allRequiredPresent = true
  
  console.log(chalk.white.bold('Variables Requeridas:'))
  for (const varName of REQUIRED_VARS) {
    const isPresent = checkEnvVar(varName, true)
    if (!isPresent) {
      allRequiredPresent = false
    }
  }
  
  console.log(chalk.white.bold('\nVariables Opcionales:'))
  for (const varName of OPTIONAL_VARS) {
    checkEnvVar(varName, false)
  }
  
  console.log('\n' + chalk.blue.bold('📋 Resumen:'))
  
  if (allRequiredPresent) {
    console.log(chalk.green.bold('✅ Todas las variables requeridas están configuradas'))
    console.log(chalk.whiteText('El proyecto debería funcionar correctamente.'))
  } else {
    console.log(chalk.red.bold('❌ Faltan variables requeridas'))
    console.log(chalk.whiteText('Por favor configura las variables faltantes en env.local'))
  }
  
  // Mostrar información adicional
  console.log('\n' + chalk.blue.bold('💡 Información:'))
  console.log(chalk.whiteText('- Archivo de configuración: env.local'))
  console.log(chalk.whiteText('- Crear copia desde: .env.example (si existe)'))
  console.log(chalk.whiteText('- Variables NEXT_PUBLIC_* son accesibles en el cliente'))
  console.log(chalk.whiteText('- Otras variables solo son accesibles en el servidor'))
  
  process.exit(allRequiredPresent ? 0 : 1)
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main()
}

module.exports = { checkEnvVar, REQUIRED_VARS, OPTIONAL_VARS }
