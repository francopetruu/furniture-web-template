# 🚀 Despliegue en Vercel con Variables de Ambiente

Esta guía te muestra cómo configurar y usar las variables de ambiente en Vercel.

## 📋 Configuración del archivo vercel.json

El archivo `vercel.json` está configurado para usar referencias a variables de ambiente:

```json
{
  "build": {
    "env": {
      "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key",
      "SUPABASE_SERVICE_KEY": "@supabase_service_key",
      "EMAIL_HOST": "@email_host",
      "EMAIL_PORT": "@email_port", 
      "EMAIL_USER": "@email_user",
      "EMAIL_PASS": "@email_pass",
      "NEXT_PUBLIC_WHATSAPP_PHONE": "@whatsapp_phone",
      "NEXT_PUBLIC_GA_ID": "@ga_id"
    }
  }
}
```

## 🛠️ Configuración Manual en el Dashboard de Vercel

### 1. Acceder al Dashboard
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión y selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**

### 2. Agregar Variables Requeridas

**Variables Públicas** (visibles en el cliente):
```
NEXT_PUBLIC_SUPABASE_URL = https://uoqqmzfytsfwdvftryuk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = [tu_clave_anon_de_supabase]
NEXT_PUBLIC_WHATSAPP_PHONE = 5492236190977
NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
```

**Variables Privadas** (solo servidor):
```
SUPABASE_SERVICE_KEY = [tu_clave_de_servicio_supabase]
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_USER = [tu_email]
EMAIL_PASS = [tu_password_de_app]
```

### 3. Configurar Ambientes
Para cada variable, selecciona los ambientes:
- ✅ **Production** (para despliegues en producción)
- ✅ **Preview** (para pull requests)
- ✅ **Development** (para desarrollo local en Vercel)

## 🖥️ Configuración usando Vercel CLI

### 1. Instalar Vercel CLI
```bash
npm i -g vercel
```

### 2. Hacer Login
```bash
vercel login
```

### 3. Conectar Proyecto
```bash
vercel link
```

### 4. Usar Nuestro Script Automatizado
```bash
npm run env:vercel
```

Este script:
- ✅ Verifica que Vercel CLI esté instalado
- ✅ Lee las variables desde `env.local`
- ✅ Muestra comandos para configurar cada variable
- ✅ Distingue entre variables públicas y privadas

### 5. Configuración Manual con CLI

Si prefieres configurar manualmente:

```bash
# Variables públicas
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_WHATSAPP_PHONE
vercel env add NEXT_PUBLIC_GA_ID

# Variables privadas
vercel env add SUPABASE_SERVICE_KEY
vercel env add EMAIL_HOST
vercel env add EMAIL_PORT
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
```

## 🔧 Alternativa: Archivo .env.production

También puedes crear un archivo `.env.production` para Vercel:

```bash
# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://uoqqmzfytsfwdvftryuk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon
SUPABASE_SERVICE_KEY=tu_clave_servicio
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email
EMAIL_PASS=tu_password
NEXT_PUBLIC_WHATSAPP_PHONE=tu_numero
NEXT_PUBLIC_GA_ID=tu_ga_id
```

⚠️ **Importante**: No commitees este archivo al repositorio.

## 🚀 Proceso de Despliegue

### 1. Verificar Variables Localmente
```bash
npm run env:check
```

### 2. Build Local (Opcional)
```bash
npm run build
```

### 3. Desplegar a Vercel
```bash
# Despliegue de preview
vercel

# Despliegue a producción
vercel --prod
```

## 🔍 Verificar Configuración

### 1. En el Dashboard
- Ve a **Settings** → **Environment Variables**
- Verifica que todas las variables estén configuradas
- Confirma que están asignadas a los ambientes correctos

### 2. En el Build Log
- Revisa los logs de construcción en Vercel
- Busca errores relacionados con variables de ambiente
- Verifica que las variables públicas aparecen en el bundle

### 3. En el Navegador (Solo variables públicas)
```javascript
// En las DevTools del navegador
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log(process.env.NEXT_PUBLIC_WHATSAPP_PHONE)
```

## 🔒 Seguridad

### Variables Públicas (NEXT_PUBLIC_*)
- ✅ Accesibles en cliente y servidor
- ⚠️ **Visibles para cualquier usuario**
- 💡 Solo usa para datos no sensibles

### Variables Privadas
- ✅ Solo accesibles en el servidor
- 🔒 **Protegidas de usuarios**
- 💡 Usa para credenciales y claves

## 🚨 Troubleshooting

### Problema: Variables undefined en producción
**Solución:**
1. Verificar que estén configuradas en Vercel Dashboard
2. Confirmar que están asignadas al ambiente `production`
3. Redesplegar: `vercel --prod`

### Problema: Variables públicas undefined en cliente
**Solución:**
1. Verificar que tengan prefijo `NEXT_PUBLIC_`
2. Limpiar caché: `vercel env rm [VARIABLE] && vercel env add [VARIABLE]`
3. Redesplegar

### Problema: Build falla por variables faltantes
**Solución:**
1. Ejecutar `npm run env:check` localmente
2. Verificar configuración en Vercel
3. Revisar logs de build en Dashboard

## 📋 Lista de Verificación Pre-Deploy

- [ ] ✅ Todas las variables configuradas localmente (`npm run env:check`)
- [ ] ✅ Variables configuradas en Vercel Dashboard/CLI
- [ ] ✅ Variables asignadas a ambientes correctos
- [ ] ✅ Build local exitoso (`npm run build`)
- [ ] ✅ Credenciales de producción (no development)
- [ ] ✅ URLs de producción configuradas

## 🎉 Scripts Disponibles

```bash
npm run env:check    # Verificar variables locales
npm run env:vercel   # Guía para configurar en Vercel
vercel               # Deploy preview
vercel --prod        # Deploy producción
```

¡Tu proyecto está listo para desplegarse en Vercel! 🚀
