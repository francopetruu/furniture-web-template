# Variables de Ambiente

Este documento explica cómo configurar y usar las variables de ambiente en el proyecto.

## Configuración

### 1. Archivo de Variables de Ambiente

Las variables de ambiente se configuran en el archivo `env.local` en la raíz del proyecto.

```bash
# Copiar desde el ejemplo (si existe)
cp .env.example env.local

# O crear manualmente
touch env.local
```

### 2. Variables Requeridas

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_KEY=your_supabase_service_key_here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

### 3. Variables Opcionales

```env
# WhatsApp Business (optional)
NEXT_PUBLIC_WHATSAPP_PHONE=5492236190977

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Environment
NODE_ENV=development
```

## Uso en el Código

### 1. Importar Configuración

```typescript
import { env } from '@/lib/env'

// Usar las variables
const supabaseUrl = env.supabase.url
const emailConfig = env.email
```

### 2. Hooks para Componentes React

```typescript
import { useEnv, useSupabaseEnv, useWhatsAppEnv } from '@/hooks/useEnv'

function MyComponent() {
  const { supabase, whatsapp } = useEnv()
  
  // Usar las variables
  console.log(supabase.url)
  console.log(whatsapp.phone)
}
```

### 3. En APIs (Server-side)

```typescript
// En rutas API
import { env } from '@/lib/env'

export async function POST() {
  const emailUser = env.email.user
  const emailPass = env.email.pass
  
  // Usar para enviar emails
}
```

## Validación

### 1. Script de Validación

```bash
# Validar variables de ambiente
npm run env:check

# O directamente
node scripts/check-env.js
```

### 2. Validación Automática

Las variables se validan automáticamente:
- Antes de `npm run dev`
- Antes de `npm run build`
- Al importar `@/lib/env`

### 3. Componente de Debug (Solo desarrollo)

```typescript
import EnvStatus from '@/components/dev/EnvStatus'

function Layout() {
  return (
    <div>
      {/* Tu contenido */}
      <EnvStatus /> {/* Solo visible en desarrollo */}
    </div>
  )
}
```

## Tipos de Variables

### Variables Públicas (NEXT_PUBLIC_*)

- Accesibles en cliente y servidor
- Incluidas en el bundle del cliente
- ⚠️ **Visibles para cualquier usuario**

### Variables Privadas

- Solo accesibles en el servidor
- No incluidas en el bundle del cliente
- ✅ **Seguras para información sensible**

## Archivos de Configuración

```
proyecto/
├── env.local           # Variables locales (gitignore)
├── .env.example        # Plantilla de variables
├── src/lib/env.ts      # Configuración centralizada
├── src/hooks/useEnv.ts # Hooks para React
└── scripts/check-env.js # Script de validación
```

## Troubleshooting

### Problema: Variables no cargadas

1. Verificar que el archivo `env.local` existe
2. Ejecutar `npm run env:check`
3. Reiniciar el servidor de desarrollo

### Problema: Variables undefined en cliente

1. Verificar que tengan prefijo `NEXT_PUBLIC_`
2. Reiniciar el servidor de desarrollo
3. Limpiar caché: `rm -rf .next`

### Problema: Variables no disponibles en producción

1. Configurar variables en el servicio de hosting
2. Verificar que no dependan de archivos locales
3. Usar configuración específica de producción

## Scripts Disponibles

```bash
npm run env:check      # Validar configuración
npm run env:validate   # Alias para env:check
npm run env:vercel     # Guía para configurar en Vercel
npm run dev           # Desarrollo (con validación)
npm run build         # Build (con validación)
```

## Seguridad

### ✅ Buenas Prácticas

- Usar variables privadas para información sensible
- No commitear archivos `.env*` al repositorio
- Rotar claves regularmente
- Usar diferentes valores para desarrollo/producción

### ❌ Evitar

- Poner información sensible en variables `NEXT_PUBLIC_*`
- Commitear archivos con credenciales reales
- Usar las mismas credenciales en todos los ambientes
- Hardcodear valores en el código

## Despliegue en Vercel

Para configurar variables de ambiente en Vercel, consulta:
📖 **[Guía de Despliegue en Vercel](./VERCEL_DEPLOYMENT.md)**

```bash
npm run env:vercel  # Guía interactiva
```

## Soporte

Si tienes problemas con las variables de ambiente:

1. Ejecuta `npm run env:check`
2. Para Vercel: `npm run env:vercel`
3. Revisa este documento
4. Verifica la configuración en `src/lib/env.ts`
5. Consulta los logs del servidor
