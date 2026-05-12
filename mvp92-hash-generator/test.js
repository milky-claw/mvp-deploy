// Tests for mvp92-hash-generator
const tests = [
  {
    name: 'SHA-256 produces 64 char hex',
    fn: async () => {
      const enc = new TextEncoder();
      const data = enc.encode('test');
      const hash = await crypto.subtle.digest('SHA-256', data);
      const hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
      return { pass: hex.length === 64 };
    }
  },
  {
    name: 'SHA-512 produces 128 char hex',
    fn: async () => {
      const enc = new TextEncoder();
      const data = enc.encode('test');
      const hash = await crypto.subtle.digest('SHA-512', data);
      const hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
      return { pass: hex.length === 128 };
    }
  },
  {
    name: 'SHA-1 produces 40 char hex',
    fn: async () => {
      const enc = new TextEncoder();
      const data = enc.encode('test');
      const hash = await crypto.subtle.digest('SHA-1', data);
      const hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
      return { pass: hex.length === 40 };
    }
  },
  {
    name: 'Empty string produces hash',
    fn: async () => {
      const enc = new TextEncoder();
      const data = enc.encode('');
      const hash = await crypto.subtle.digest('SHA-256', data);
      return { pass: hash.byteLength === 32 };
    }
  }
];
if (typeof module !== 'undefined') module.exports = tests;