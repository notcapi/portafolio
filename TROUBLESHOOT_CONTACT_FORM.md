# Troubleshooting: Formulario de Contacto en Producción

## El Problema

El formulario de contacto muestra el error: "Error al enviar el mensaje. Por favor, intenta de nuevo o contáctame directamente."

## Causas Comunes

### 1. Variables de Entorno Faltantes en Vercel

Las siguientes variables deben estar configuradas en Vercel:

- `RESEND_API_KEY` - API key de Resend (comienza con `re_`)
- `CONTACT_EMAIL_TO` - Email donde recibirás los mensajes
- `NEXT_PUBLIC_SITE_URL` - URL del sitio (https://ma6r.dev)
- `NEXT_PUBLIC_ENABLE_CONTACT_FORM` - `true` (para habilitar el formulario)

### 2. Dominio No Verificado en Resend

El email `contacto@ma6r.dev` requiere que el dominio `ma6r.dev` esté:
- Registrado en Resend
- Verificado con registros DNS (SPF, DKIM, DMARC)

### 3. API Key Inválida o Sin Permisos

La API key debe tener permisos de "Sending access".

## Pasos de Diagnóstico

### Paso 1: Probar Localmente

Ejecuta el script de prueba para verificar que todo funciona en local:

```bash
node scripts/test-resend-config.js
```

Este script verificará:
- ✅ Variables de entorno en `.env.local`
- ✅ Conexión con la API de Resend
- ✅ Estado del dominio ma6r.dev
- ✅ Envío de email de prueba

**Si falla localmente**, el problema es de configuración de Resend:

1. Ve a [resend.com/api-keys](https://resend.com/api-keys)
2. Verifica que tu API key esté activa
3. Verifica que tenga permisos de "Sending access"

### Paso 2: Verificar Dominio en Resend

1. Ve a [resend.com/domains](https://resend.com/domains)
2. Busca `ma6r.dev` en la lista
3. Verifica que el status sea "Verified" (verde)

**Si no está verificado:**

1. Haz clic en el dominio
2. Copia los registros DNS mostrados
3. Agrégalos a tu proveedor de DNS (Cloudflare, Namecheap, etc.)
4. Espera unos minutos y haz clic en "Verify"

Los registros típicamente son:

```
# SPF Record
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

# DKIM Record
Type: TXT
Name: resend._domainkey
Value: [valor proporcionado por Resend]

# DMARC Record
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@ma6r.dev
```

### Paso 3: Verificar Variables de Entorno en Vercel

1. Ve a tu proyecto en [vercel.com/dashboard](https://vercel.com/dashboard)
2. Ve a **Settings** → **Environment Variables**
3. Verifica que estén configuradas:

| Variable | Valor | Entornos |
|----------|-------|----------|
| `RESEND_API_KEY` | `re_...` | Production, Preview, Development |
| `CONTACT_EMAIL_TO` | `hello@ma6r.dev` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://ma6r.dev` | Production |
| `NEXT_PUBLIC_ENABLE_CONTACT_FORM` | `true` | Production, Preview, Development |

**IMPORTANTE:** Después de agregar/modificar variables, debes hacer un **Redeploy** para que se apliquen.

### Paso 4: Desplegar Cambios con Mejor Logging

Ahora que hemos mejorado el logging en la API, despliega los cambios:

```bash
git add .
git commit -m "Improve Resend error logging for debugging"
git push
```

Vercel automáticamente detectará el push y desplegará.

### Paso 5: Revisar Logs en Vercel

Después del despliegue, intenta enviar un mensaje de prueba y revisa los logs:

1. Ve a tu proyecto en Vercel
2. Ve a **Deployments** → [deployment más reciente]
3. Haz clic en la pestaña **Functions**
4. Busca `/api/contact` y haz clic en los logs

Los logs ahora mostrarán información detallada:

```
Resend API error details: {
  errorName: 'validation_error',
  errorMessage: 'Domain not verified',
  statusCode: 400,
  from: 'contacto@ma6r.dev',
  to: 'hello@ma6r.dev'
}
```

## Soluciones según el Error

### Error: "Domain not verified"

**Causa:** El dominio ma6r.dev no está verificado en Resend.

**Solución:** Sigue el Paso 2 para verificar el dominio.

### Error: "Invalid API key"

**Causa:** La API key en Vercel es incorrecta o fue revocada.

**Solución:**
1. Ve a [resend.com/api-keys](https://resend.com/api-keys)
2. Crea una nueva API key con "Sending access"
3. Actualiza `RESEND_API_KEY` en Vercel
4. Haz un Redeploy

### Error: "Rate limit exceeded"

**Causa:** Has excedido el límite de emails por hora.

**Solución:**
1. Espera 1 hora
2. Considera aumentar tu plan de Resend si envías muchos emails

### Error: "Resend client not initialized"

**Causa:** La variable `RESEND_API_KEY` no está definida en Vercel.

**Solución:** Sigue el Paso 3 para agregar la variable.

## Checklist de Verificación Rápida

Antes de contactar soporte, verifica:

- [ ] Las variables de entorno están en Vercel (Settings → Environment Variables)
- [ ] El dominio ma6r.dev está verificado en Resend (status: Verified)
- [ ] La API key es válida y tiene permisos de "Sending access"
- [ ] Hiciste un Redeploy después de cambiar variables
- [ ] Los logs en Vercel muestran el error específico
- [ ] El script de prueba local (`node scripts/test-resend-config.js`) pasa

## Testing en Local vs Producción

### Local (.env.local)
```bash
# Prueba que funcione localmente
npm run dev
# Abre http://localhost:3000/contact
# Envía un mensaje de prueba
```

### Producción (Vercel)
```bash
# Verifica variables en Vercel Dashboard
# Redeploy si es necesario
# Prueba en https://ma6r.dev/contact
# Revisa logs en Vercel
```

## Comandos Útiles

```bash
# Probar configuración de Resend
node scripts/test-resend-config.js

# Ver variables de entorno locales
cat .env.local

# Desplegar cambios
git add . && git commit -m "Fix: contact form" && git push

# Redeploy en Vercel (sin cambios de código)
# Ve a Vercel Dashboard → Deployments → Redeploy
```

## Recursos

- [Resend Dashboard](https://resend.com/overview)
- [Resend Domains](https://resend.com/domains)
- [Resend API Keys](https://resend.com/api-keys)
- [Resend Docs - Domain Verification](https://resend.com/docs/dashboard/domains/introduction)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vercel Function Logs](https://vercel.com/docs/observability/runtime-logs)

## Próximos Pasos

1. **Ejecuta el script de prueba:** `node scripts/test-resend-config.js`
2. **Verifica el dominio en Resend** si el script falla
3. **Revisa las variables en Vercel** si el dominio está OK
4. **Despliega los cambios** con mejor logging
5. **Prueba en producción** y revisa los logs en Vercel

Si después de seguir todos estos pasos sigue fallando, los logs detallados te dirán exactamente qué está mal.
