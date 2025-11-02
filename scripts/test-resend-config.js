#!/usr/bin/env node

/**
 * Script para probar la configuración de Resend localmente
 *
 * Uso:
 *   node scripts/test-resend-config.js
 *
 * Este script verifica:
 * 1. Variables de entorno necesarias
 * 2. Conexión con la API de Resend
 * 3. Dominio verificado
 * 4. Envío de email de prueba
 */

import { Resend } from 'resend';
import { readFileSync } from 'fs';

// Cargar variables de entorno desde .env.local
try {
  const envFile = readFileSync('.env.local', 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key && value) {
        process.env[key] = value;
      }
    }
  });
} catch (error) {
  console.error('⚠️  No se pudo leer .env.local, usando variables de entorno del sistema');
}

const REQUIRED_ENV_VARS = ['RESEND_API_KEY', 'CONTACT_EMAIL_TO'];
const FROM_EMAIL = 'contacto@ma6r.dev';

async function testResendConfiguration() {
  console.log('🔍 Verificando configuración de Resend...\n');

  // 1. Verificar variables de entorno
  console.log('1️⃣ Verificando variables de entorno:');
  const missingVars = REQUIRED_ENV_VARS.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Faltan las siguientes variables de entorno:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\n💡 Asegúrate de que estén definidas en .env.local');
    process.exit(1);
  }

  REQUIRED_ENV_VARS.forEach(varName => {
    const value = process.env[varName];
    const displayValue = varName === 'RESEND_API_KEY'
      ? `${value.substring(0, 10)}...`
      : value;
    console.log(`   ✓ ${varName}: ${displayValue}`);
  });

  // 2. Inicializar cliente de Resend
  console.log('\n2️⃣ Inicializando cliente de Resend:');
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log('   ✓ Cliente inicializado');

  // 3. Verificar dominio
  console.log('\n3️⃣ Verificando dominio ma6r.dev:');
  try {
    const { data: domains, error: domainsError } = await resend.domains.list();

    if (domainsError) {
      console.error('   ❌ Error al listar dominios:', domainsError.message);
      console.log('\n   ℹ️  Esto puede ocurrir si tu API key no tiene permisos para listar dominios.');
      console.log('   ⏭️  Saltando verificación de dominio y probando envío directo...');
    } else {
      console.log(`   ℹ️  Dominios encontrados: ${domains?.data?.length || 0}`);
      if (domains?.data?.length > 0) {
        console.log('   📋 Lista de dominios:');
        domains.data.forEach(d => console.log(`      - ${d.name} (${d.status})`));
      }

      const ma6rDomain = domains?.data?.find(d => d.name === 'ma6r.dev');

      if (!ma6rDomain) {
        console.log('\n   ⚠️  El dominio ma6r.dev no aparece en la lista');
        console.log('   ℹ️  Esto puede significar que:');
        console.log('      1. La API key es de otra cuenta');
        console.log('      2. El dominio está en otro workspace');
        console.log('   ⏭️  Intentaremos enviar un email de prueba de todas formas...');
      } else {
        console.log(`   ✓ Dominio encontrado: ${ma6rDomain.name}`);
        console.log(`   - Status: ${ma6rDomain.status}`);
        console.log(`   - Región: ${ma6rDomain.region}`);

        if (ma6rDomain.status !== 'verified') {
          console.error(`\n   ⚠️  El dominio NO está verificado (status: ${ma6rDomain.status})`);
          console.error('\n💡 Para verificar el dominio:');
          console.error('   1. Ve a https://resend.com/domains');
          console.error('   2. Haz clic en tu dominio');
          console.error('   3. Verifica que todos los registros DNS estén configurados');
          process.exit(1);
        }
      }
    }

  } catch (error) {
    console.error('   ❌ Error al verificar dominios:', error.message);
    console.log('   ⏭️  Continuando con el test de envío...');
  }

  // 4. Enviar email de prueba
  console.log('\n4️⃣ Enviando email de prueba:');
  try {
    const { data, error } = await resend.emails.send({
      from: `Test <${FROM_EMAIL}>`,
      to: [process.env.CONTACT_EMAIL_TO],
      subject: 'Test de configuración - Portafolio',
      html: `
        <h1>✅ Configuración exitosa</h1>
        <p>Este es un email de prueba para verificar que Resend está configurado correctamente.</p>
        <p><strong>Dominio:</strong> ma6r.dev</p>
        <p><strong>Fecha:</strong> ${new Date().toISOString()}</p>
      `,
      text: 'Test de configuración - Portafolio. Si recibes este email, Resend está configurado correctamente.',
    });

    if (error) {
      console.error('   ❌ Error al enviar email:', error);
      console.error('\n💡 Detalles del error:');
      console.error(`   - Nombre: ${error.name}`);
      console.error(`   - Mensaje: ${error.message}`);

      if (error.name === 'validation_error') {
        console.error('\n💡 Error de validación. Verifica que:');
        console.error('   - El email "to" sea válido');
        console.error('   - El dominio esté correctamente configurado');
      }

      process.exit(1);
    }

    console.log(`   ✓ Email enviado exitosamente`);
    console.log(`   - ID: ${data.id}`);
    console.log(`   - From: ${FROM_EMAIL}`);
    console.log(`   - To: ${process.env.CONTACT_EMAIL_TO}`);

  } catch (error) {
    console.error('   ❌ Error inesperado:', error.message);
    process.exit(1);
  }

  console.log('\n✅ Todas las verificaciones pasaron correctamente!');
  console.log('\n💡 Próximos pasos:');
  console.log('   1. Verifica tu bandeja de entrada');
  console.log('   2. Si todo funciona localmente, verifica las variables en Vercel');
  console.log('   3. Despliega los cambios con mejor logging');
}

testResendConfiguration().catch(error => {
  console.error('\n❌ Error fatal:', error);
  process.exit(1);
});
