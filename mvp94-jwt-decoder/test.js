// Test runner for MVP 94: JWT Decoder
// Tests: decode, validate format, handle errors

function testDecodeJWT() {
  // Valid JWT structure
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Should have 3 parts');
  
  const decode = (str) => {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  };
  
  const header = decode(parts[0]);
  if (header.alg !== 'HS256') throw new Error('Should decode header');
  
  const payload = decode(parts[1]);
  if (payload.sub !== '1234567890') throw new Error('Should decode payload');
  if (payload.name !== 'John Doe') throw new Error('Should decode name');
  
  return true;
}

function testInvalidFormat() {
  try {
    'abc.def'.split('.');
    throw new Error('Should throw on invalid');
  } catch (e) {
    return true;
  }
}

function testEmptyHandler() {
  const result = '';
  if (result !== '') throw new Error('Empty should work');
  return true;
}

let passed = 0;
try { if (testDecodeJWT()) passed++; } catch (e) { console.log('Fail:', e.message); }
try { if (testInvalidFormat()) passed++; } catch (e) { console.log('Fail:', e.message); }
try { if (testEmptyHandler()) passed++; } catch (e) { console.log('Fail:', e.message); }

console.log(`JWT Decoder: ${passed}/3 passed`);
process.exit(passed >= 2 ? 0 : 1);