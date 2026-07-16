const crypto = require('crypto');

/**
 * Middleware de segurança aprimorada
 */

/**
 * Rate limiting simples em memória
 */
const rateLimitStore = new Map();

exports.rateLimit = (windowMs = 15 * 60 * 1000, maxRequests = 100) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitStore.has(ip)) {
      rateLimitStore.set(ip, []);
    }
    
    const requests = rateLimitStore.get(ip);
    
    // Remove requisições fora da janela de tempo
    const recentRequests = requests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({ 
        message: "Muitas requisições. Tente novamente mais tarde.",
        retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000)
      });
    }
    
    recentRequests.push(now);
    rateLimitStore.set(ip, recentRequests);
    
    next();
  };
};

/**
 * Validação de entrada para prevenir injeção
 */
exports.validateInput = (req, res, next) => {
  // Sanitiza strings no body
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        // Remove caracteres perigosos
        req.body[key] = req.body[key]
          .replace(/[<>]/g, '')
          .trim();
      }
    });
  }
  
  next();
};

/**
 * Adiciona headers de segurança
 */
exports.securityHeaders = (req, res, next) => {
  // Previne clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Previne MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Ativa proteção XSS
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
};

/**
 * Logging de segurança
 */
exports.securityLog = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      ip: req.ip,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('user-agent')
    };
    
    // Log de tentativas de acesso não autorizado
    if (res.statusCode === 401 || res.statusCode === 403) {
      console.warn('[SECURITY]', JSON.stringify(log));
    }
  });
  
  next();
};

/**
 * Validação de CORS com lista branca
 */
exports.corsWhitelist = (whitelist = []) => {
  return (req, res, next) => {
    const origin = req.get('origin');
    
    if (whitelist.includes(origin) || process.env.NODE_ENV === 'development') {
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    
    next();
  };
};

/**
 * Proteção contra CSRF (simples)
 */
exports.csrfProtection = (req, res, next) => {
  // Apenas para métodos que modificam dados
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.get('x-csrf-token');
    
    // Em produção, verificar token contra sessão
    if (!token && process.env.NODE_ENV === 'production') {
      return res.status(403).json({ message: "CSRF token inválido" });
    }
  }
  
  next();
};

/**
 * Gera um token CSRF
 */
exports.generateCSRFToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Validação de senha forte
 */
exports.validateStrongPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    requirements: {
      minLength: password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    }
  };
};

/**
 * Middleware para detectar tentativas de ataque
 */
exports.detectAttacks = (req, res, next) => {
  const suspiciousPatterns = [
    /(\bselect\b|\bunion\b|\bdrop\b|\binsert\b|\bupdate\b|\bdelete\b)/i, // SQL injection
    /<script|javascript:|onerror=/i, // XSS
    /\.\.\//g, // Path traversal
  ];
  
  const queryString = JSON.stringify(req.query) + JSON.stringify(req.body);
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(queryString)) {
      console.warn('[ATTACK DETECTED]', {
        ip: req.ip,
        method: req.method,
        path: req.path,
        timestamp: new Date().toISOString()
      });
      
      return res.status(400).json({ message: "Requisição inválida" });
    }
  }
  
  next();
};
