#!/usr/bin/env node

/**
 * Script para configurar variables de ambiente en Vercel
 * Ejecutar con: node scripts/setup-vercel-env.js
 * 
 * Prerrequisitos:
 * 1. Instalar Vercel CLI: npm i -g vercel
 * 2. Hacer login: vercel login
 * 3. Conectar proyecto: vercel link
 */

require('dotenv').config({ path: './env.local' })
const { execSync } = require('child_process')

// Colores para terminal
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m\x1b[1m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
}

// Variables a configurar en Vercel
const ENV_VARS = {
  // Variables públicas (visibles en el cliente)
  'NEXT_PUBLIC_SUPABASE_URL': {
    value: process.env.NEXT_PUBLIC_SUPABASE_URL,
    required: true,
    type: 'public'
  },
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': {
    value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    required: true,
    type: 'public'
  },
  'NEXT_PUBLIC_WHATSAPP_PHONE': {
    value: process.env.NEXT_PUBLIC_WHATSAPP_PHONE,
    required: false,
    type: 'public'
  },
  'NEXT_PUBLIC_GA_ID': {
    value: process.env.NEXT_PUBLIC_GA_ID,
    required: false,
    type: 'public'
  },
  
  // Variables privadas (solo servidor)
  'SUPABASE_SERVICE_KEY': {
    value: process.env.SUPABASE_SERVICE_KEY,
    required: true,
    type: 'private'
  },
  'EMAIL_HOST': {
    value: process.env.EMAIL_HOST,
    required: true,
    type: 'private'
  },
  'EMAIL_PORT': {
    value: process.env.EMAIL_PORT,
    required: true,
    type: 'private'
  },
  'EMAIL_USER': {
    value: process.env.EMAIL_USER,
    required: true,
    type: 'private'
  },
  'EMAIL_PASS': {
    value: process.env.EMAIL_PASS,
    required: true,
    type: 'private'
  },
}

function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'pipe' })
    return true
  } catch (error) {
    return false
  }
}

function setVercelEnv(name, value, environment = 'production,preview,development') {
  try {
    const command = `vercel env add ${name} ${environment}`
    console.log(colors.gray(`Ejecutando: ${command}`))
    
    // Ejecutar comando interactivo
    execSync(command, { 
      stdio: 'inherit',
      input: value + '\n'
    })
    
    return true
  } catch (error) {
    console.error(colors.red(`Error configurando ${name}: ${error.message}`))
    return false
  }
}

function generateVercelCommands() {
  console.log(colors.blue('\n📋 Comandos para configurar manualmente:\n'))
  
  Object.entries(ENV_VARS).forEach(([name, config]) => {
    if (config.value) {
      console.log(colors.gray(`vercel env add ${name}`))
      console.log(colors.yellow(`# Valor: ${config.type === 'private' ? '***hidden***' : config.value}`))
      console.log(colors.gray(`# Tipo: ${config.type} | Requerido: ${config.required ? 'Sí' : 'No'}\n`))
    }
  })
}

function main() {
  console.log(colors.blue('🚀 Configuración de Variables de Ambiente en Vercel\n'))
  
  // Verificar Vercel CLI
  if (!checkVercelCLI()) {
    console.log(colors.red('❌ Vercel CLI no está instalado'))
    console.log(colors.yellow('Instalar con: npm i -g vercel'))
    console.log(colors.yellow('Luego ejecutar: vercel login'))
    process.exit(1)
  }
  
  console.log(colors.green('✅ Vercel CLI encontrado'))
  
  // Verificar variables locales
  let missingRequired = []
  let configuredVars = []
  
  console.log(colors.blue('\n📊 Estado de Variables:\n'))
  
  Object.entries(ENV_VARS).forEach(([name, config]) => {
    const hasValue = Boolean(config.value && config.value.length > 0)
    
    if (config.required && !hasValue) {
      missingRequired.push(name)
      console.log(colors.red(`❌ ${name}: FALTANTE (requerida)`))
    } else if (hasValue) {
      configuredVars.push(name)
      const displayValue = config.type === 'private' ? '***hidden***' : config.value
      console.log(colors.green(`✅ ${name}: ${displayValue}`))
    } else {
      console.log(colors.gray(`⏸️  ${name}: No configurada (opcional)`))
    }
  })
  
  if (missingRequired.length > 0) {
    console.log(colors.red(`\n❌ Faltan ${missingRequired.length} variables requeridas`))
    console.log(colors.yellow('Configúralas en env.local primero'))
    process.exit(1)
  }
  
  console.log(colors.green(`\n✅ Todas las variables requeridas están disponibles`))
  console.log(colors.blue(`📊 Total a configurar: ${configuredVars.length} variables`))
  
  // Mostrar comandos para configuración manual
  generateVercelCommands()
  
  console.log(colors.blue('💡 Notas Importantes:'))
  console.log(colors.gray('• Variables NEXT_PUBLIC_* son visibles en el cliente'))
  console.log(colors.gray('• Otras variables solo están disponibles en el servidor'))
  console.log(colors.gray('• Configurar para: production, preview, development'))
  console.log(colors.gray('• Después de configurar: vercel --prod para desplegar'))
  
  console.log(colors.green('\n🎉 ¡Configuración lista para Vercel!'))
}

if (require.main === module) {
  main()
}

module.exports = { ENV_VARS, setVercelEnv }
