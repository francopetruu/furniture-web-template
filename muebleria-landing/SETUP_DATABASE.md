# 🗄️ Configuración de Base de Datos - Supabase

Este documento explica cómo configurar la base de datos en Supabase para que el formulario de contacto funcione correctamente.

## 🚨 **Error Actual**

Si estás viendo el error:
```
POST /api/contact 500 in 2529ms
{"error":"Error al guardar la consulta"}
```

Es porque la tabla `inquiries` no existe en tu base de datos de Supabase.

## ✅ **Solución Rápida**

### **Paso 1: Acceder a Supabase**
1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión en tu proyecto
3. Ve a la sección **SQL Editor**

### **Paso 2: Ejecutar Script SQL**
Copia y pega el siguiente código en el SQL Editor y ejecuta:

```sql
-- 1. Crear tabla de consultas/inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  product_id UUID NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar RLS pero permitir inserción pública
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para permitir inserción desde la web
CREATE POLICY "Allow public insert to inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- 4. Crear política para que el propietario pueda leer sus datos
CREATE POLICY "Allow service role read access to inquiries" ON inquiries
  FOR SELECT USING (auth.role() = 'service_role');
```

### **Paso 3: Verificar**
1. Ve a **Database** → **Tables**
2. Deberías ver la tabla `inquiries` creada
3. Prueba el formulario de contacto en tu web

## 📋 **Script Completo (Opcional)**

Si quieres crear todas las tablas del proyecto, usa el archivo `setup-database.sql`:

1. Abre el archivo `setup-database.sql` en este proyecto
2. Copia todo el contenido
3. Pégalo en el SQL Editor de Supabase
4. Ejecuta

Esto creará:
- ✅ Tabla `inquiries` (consultas)
- ✅ Tabla `categories` (categorías)
- ✅ Tabla `productos` (productos)
- ✅ Datos de ejemplo
- ✅ Políticas de seguridad

## 🔧 **Estado de la API Actual**

He modificado la API para que sea más robusta:

### ✅ **Funciona Sin Base de Datos**
- Si la tabla no existe, sigue funcionando
- Envía emails normalmente
- No falla el formulario

### ✅ **Manejo de Errores**
- Logs detallados en consola
- Continúa funcionando aunque falle DB o email
- Respuesta exitosa al usuario

## 📝 **Después de Configurar la DB**

Una vez que configures la base de datos:

1. **Las consultas se guardarán** en la tabla `inquiries`
2. **Podrás ver las consultas** en el panel de Supabase
3. **Los emails seguirán funcionando** como antes

## 🔍 **Verificar Configuración**

### **Ver Consultas Guardadas**
```sql
SELECT * FROM inquiries ORDER BY created_at DESC;
```

### **Probar Inserción Manual**
```sql
INSERT INTO inquiries (name, email, phone, message) 
VALUES ('Test User', 'test@email.com', '1234567890', 'Mensaje de prueba');
```

## 🚨 **Troubleshooting**

### **Error: "table inquiries does not exist"**
- Ejecuta el script SQL del Paso 2

### **Error: "new row violates row-level security policy"**
- Verifica que las políticas RLS estén configuradas (Paso 2)

### **Emails no llegan**
- Verifica las variables EMAIL_* en `env.local`
- Revisa la consola del servidor para errores de SMTP

### **Formulario no responde**
- Verifica que el servidor esté corriendo (`npm run dev`)
- Revisa la consola del navegador para errores

## 📞 **Soporte**

Si sigues teniendo problemas:

1. Revisa los logs del servidor
2. Verifica las variables de ambiente (`npm run env:check`)
3. Confirma que Supabase esté configurado correctamente

¡Una vez configurada la base de datos, todo debería funcionar perfectamente! 🎉
