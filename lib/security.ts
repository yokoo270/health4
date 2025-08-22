/**
 * Security utilities for XSS, SQL injection, and general attack protection
 */

// XSS Protection - HTML/JavaScript sanitization
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#96;')
    .replace(/=/g, '&#61;');
}

// SQL Injection Protection - Input validation and sanitization
export function sanitizeSqlInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  // Remove common SQL injection patterns
  return input
    .replace(/['";]/g, '') // Remove quotes and semicolons
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove SQL block comments start
    .replace(/\*\//g, '') // Remove SQL block comments end
    .replace(/xp_/gi, '') // Remove xp_ commands
    .replace(/sp_/gi, '') // Remove sp_ commands
    .replace(/exec/gi, '') // Remove exec commands
    .replace(/execute/gi, '') // Remove execute commands
    .replace(/select/gi, '') // Remove select statements
    .replace(/insert/gi, '') // Remove insert statements
    .replace(/update/gi, '') // Remove update statements
    .replace(/delete/gi, '') // Remove delete statements
    .replace(/drop/gi, '') // Remove drop statements
    .replace(/create/gi, '') // Remove create statements
    .replace(/alter/gi, '') // Remove alter statements
    .replace(/union/gi, '') // Remove union statements
    .replace(/or\s+1\s*=\s*1/gi, '') // Remove OR 1=1 patterns
    .replace(/and\s+1\s*=\s*1/gi, '') // Remove AND 1=1 patterns
    .trim();
}

// Input validation for common fields
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateUsername(username: string): boolean {
  // Only allow alphanumeric characters, underscores, and hyphens
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  return usernameRegex.test(username) && username.length >= 3 && username.length <= 30;
}

// Rate limiting helpers
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 10, 
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { allowed: boolean; resetTime: number } {
  const now = Date.now();
  const current = rateLimitMap.get(identifier);
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, resetTime: now + windowMs };
  }
  
  if (current.count >= maxRequests) {
    return { allowed: false, resetTime: current.resetTime };
  }
  
  current.count++;
  return { allowed: true, resetTime: current.resetTime };
}

// CSRF Protection
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length === 64;
}

// Content Security Policy helper
export function getContentSecurityPolicy(): string {
  const nonce = generateCSRFToken();
  
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.paypal.com https://js.paypal.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.openai.com https://api.anthropic.com https://world.openfoodfacts.org",
    "frame-src 'self' https://www.paypal.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    `nonce-${nonce}`
  ].join('; ');
}

// General input sanitization
export function sanitizeInput(input: unknown): string {
  if (input === null || input === undefined) return '';
  
  const str = String(input);
  
  // Remove null bytes and control characters
  return str
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/[\uFFF0-\uFFFF]/g, '')
    .trim()
    .slice(0, 1000); // Limit length to prevent DoS
}

// File upload validation
export function validateFileUpload(file: File): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (file.size > maxSize) {
    errors.push('File size must be less than 5MB');
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('Only JPEG, PNG, WebP, and GIF files are allowed');
  }
  
  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  
  if (!extension || !allowedExtensions.includes(extension)) {
    errors.push('Invalid file extension');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// API Key validation
export function validateApiKey(apiKey: string): boolean {
  // Basic API key format validation
  if (typeof apiKey !== 'string') return false;
  if (apiKey.length < 20 || apiKey.length > 200) return false;
  
  // Only allow alphanumeric characters, hyphens, and underscores
  const apiKeyRegex = /^[a-zA-Z0-9_-]+$/;
  return apiKeyRegex.test(apiKey);
}

// Subscription validation
export function validateSubscriptionPlan(plan: string): boolean {
  const allowedPlans = ['free', 'basic', 'premium'];
  return allowedPlans.includes(plan.toLowerCase());
}

// Payment validation
export function validatePaymentAmount(amount: number): boolean {
  return typeof amount === 'number' && amount > 0 && amount <= 10000 && Number.isFinite(amount);
}

// Session validation
export function validateSession(sessionData: any): boolean {
  if (!sessionData || typeof sessionData !== 'object') return false;
  
  const requiredFields = ['userId', 'email', 'createdAt'];
  return requiredFields.every(field => sessionData.hasOwnProperty(field));
}

// Encrypt sensitive data (for storing in localStorage/sessionStorage)
export async function encryptData(data: string, key?: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(data);
    
    // Generate a random IV
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Import key or use a default one (in production, use proper key management)
    const keyBytes = key ? encoder.encode(key.padEnd(32, '0').slice(0, 32)) : encoder.encode('default-encryption-key-32-chars');
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
    
    // Encrypt the data
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      dataBytes
    );
    
    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);
    
    // Convert to base64
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error('Encryption failed:', error);
    return data; // Fallback to unencrypted data
  }
}

// Decrypt sensitive data
export async function decryptData(encryptedData: string, key?: string): Promise<string> {
  try {
    // Convert from base64
    const combined = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    );
    
    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);
    
    const encoder = new TextEncoder();
    const keyBytes = key ? encoder.encode(key.padEnd(32, '0').slice(0, 32)) : encoder.encode('default-encryption-key-32-chars');
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    
    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      encrypted
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return encryptedData; // Fallback to encrypted data
  }
}

// Audit logging
export function logSecurityEvent(event: {
  type: 'login' | 'logout' | 'failed_login' | 'payment' | 'subscription_change' | 'data_access' | 'security_violation';
  userId?: string;
  ip?: string;
  userAgent?: string;
  details?: any;
}): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ...event
  };
  
  // In production, send to a secure logging service
  console.log('[SECURITY LOG]', logEntry);
  
  // Store in localStorage for development (in production, use a secure backend)
  try {
    const existingLogs = localStorage.getItem('security_logs');
    const logs = existingLogs ? JSON.parse(existingLogs) : [];
    logs.push(logEntry);
    
    // Keep only last 100 logs to prevent storage overflow
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100);
    }
    
    localStorage.setItem('security_logs', JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to store security log:', error);
  }
}
