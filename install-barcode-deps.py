#!/usr/bin/env python3
"""
Install barcode scanning dependencies for HealthMaxxing app
"""

import json
import subprocess
import sys
import os

def install_dependencies():
    """Install the necessary dependencies for barcode scanning"""
    
    # Check if package.json exists
    if not os.path.exists('package.json'):
        print("❌ Error: package.json not found")
        return False
    
    # Read current package.json
    with open('package.json', 'r') as f:
        package_data = json.load(f)
    
    # Dependencies to add for barcode scanning
    new_dependencies = {
        "@zxing/library": "^0.21.0",  # For barcode detection
        "@zxing/browser": "^0.1.5",   # Browser integration
        "jsqr": "^1.4.0",             # Alternative QR code scanner
    }
    
    # Add to dependencies if not already present
    dependencies = package_data.get('dependencies', {})
    updated = False
    
    for dep, version in new_dependencies.items():
        if dep not in dependencies:
            dependencies[dep] = version
            updated = True
            print(f"✅ Added {dep}: {version}")
        else:
            print(f"ℹ️  {dep} already exists")
    
    if updated:
        # Update package.json
        package_data['dependencies'] = dependencies
        
        with open('package.json', 'w') as f:
            json.dump(package_data, f, indent=2)
        
        print("\n📦 Updated package.json")
        
        # Run npm install
        try:
            print("\n🔄 Running npm install...")
            result = subprocess.run(['npm', 'install'], check=True, capture_output=True, text=True)
            print("✅ Dependencies installed successfully!")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Error installing dependencies: {e}")
            print(f"Stdout: {e.stdout}")
            print(f"Stderr: {e.stderr}")
            return False
    else:
        print("\n✅ All dependencies already installed")
        return True

if __name__ == "__main__":
    success = install_dependencies()
    sys.exit(0 if success else 1)
