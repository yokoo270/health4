#!/usr/bin/env python3
"""
Script para instalar dependencias de Node.js para HealthMaxxingAI Backend
Incluye las nuevas dependencias para sessions
"""

import subprocess
import sys
import os

def run_command(command, description):
    """Ejecuta un comando y maneja errores"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completado exitosamente")
        if result.stdout:
            print(f"📋 Salida: {result.stdout.strip()}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error en {description}")
        print(f"💬 Error: {e.stderr.strip()}")
        return False

def main():
    print("🚀 Instalador de dependencias para HealthMaxxingAI Backend")
    print("=" * 60)
    
    # Verificar si estamos en el directorio correcto
    if not os.path.exists("package.json"):
        print("❌ Error: No se encontró package.json")
        print("💡 Asegúrate de ejecutar este script desde el directorio healthmaxxing-backend")
        sys.exit(1)
    
    # Verificar si Node.js está instalado
    print("\n🔍 Verificando Node.js...")
    if not run_command("node --version", "Verificación de Node.js"):
        print("❌ Node.js no está instalado")
        print("💡 Instala Node.js desde: https://nodejs.org/")
        sys.exit(1)
    
    # Verificar si npm está instalado
    print("\n🔍 Verificando npm...")
    if not run_command("npm --version", "Verificación de npm"):
        print("❌ npm no está instalado")
        sys.exit(1)
    
    # Limpiar cache de npm (opcional pero recomendado)
    print("\n🧹 Limpiando cache de npm...")
    run_command("npm cache clean --force", "Limpieza de cache")
    
    # Eliminar node_modules si existe (para instalación limpia)
    if os.path.exists("node_modules"):
        print("\n🗑️ Eliminando node_modules existente...")
        if os.name == 'nt':  # Windows
            run_command("rmdir /s /q node_modules", "Eliminación de node_modules")
        else:  # Unix/Linux/Mac
            run_command("rm -rf node_modules", "Eliminación de node_modules")
    
    # Eliminar package-lock.json si existe
    if os.path.exists("package-lock.json"):
        print("\n🗑️ Eliminando package-lock.json...")
        os.remove("package-lock.json")
        print("✅ package-lock.json eliminado")
    
    # Instalar dependencias
    print("\n📦 Instalando dependencias principales...")
    dependencies = [
        "express@^4.18.2",
        "cors@^2.8.5", 
        "sqlite3@^5.1.6",
        "bcryptjs@^2.4.3",
        "uuid@^9.0.1",
        "express-session@^1.17.3",
        "connect-sqlite3@^0.9.13"
    ]
    
    for dep in dependencies:
        if not run_command(f"npm install {dep}", f"Instalación de {dep}"):
            print(f"⚠️ Error instalando {dep}, continuando...")
    
    # Instalar dependencias de desarrollo
    print("\n🛠️ Instalando dependencias de desarrollo...")
    dev_dependencies = [
        "nodemon@^3.0.1"
    ]
    
    for dep in dev_dependencies:
        if not run_command(f"npm install --save-dev {dep}", f"Instalación de {dep} (dev)"):
            print(f"⚠️ Error instalando {dep}, continuando...")
    
    # Verificar instalación
    print("\n✅ Verificando instalación...")
    if run_command("npm list --depth=0", "Verificación de dependencias"):
        print("\n🎉 ¡Instalación completada exitosamente!")
        print("\n📋 Dependencias instaladas:")
        print("   - express (servidor web)")
        print("   - cors (manejo de CORS)")
        print("   - sqlite3 (base de datos)")
        print("   - bcryptjs (encriptación de contraseñas)")
        print("   - uuid (generación de IDs únicos)")
        print("   - express-session (manejo de sessions)")
        print("   - connect-sqlite3 (almacenamiento de sessions en SQLite)")
        print("   - nodemon (desarrollo - reinicio automático)")
        
        print("\n🚀 Para iniciar el servidor:")
        print("   npm start        (producción)")
        print("   npm run dev      (desarrollo con nodemon)")
        print("   node server.js   (directo)")
        
    else:
        print("\n❌ Hubo problemas en la instalación")
        print("💡 Intenta ejecutar manualmente: npm install")

if __name__ == "__main__":
    main()
