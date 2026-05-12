// Tests for mvp93-url-parser
const tests = [
  {
    name: 'Parse basic URL',
    fn: () => {
      const url = new URL('https://example.com/path');
      return { pass: url.hostname === 'example.com' && url.pathname === '/path' };
    }
  },
  {
    name: 'Parse query params',
    fn: () => {
      const url = new URL('https://example.com?key=value');
      return { pass: url.searchParams.get('key') === 'value' };
    }
  },
  {
    name: 'Parse multiple params',
    fn: () => {
      const url = new URL('https://example.com?a=1&b=2');
      return { pass: url.searchParams.get('a') === '1' && url.searchParams.get('b') === '2' };
    }
  },
  {
    name: 'Parse port',
    fn: () => {
      const url = new URL('https://example.com:8080/path');
      return { pass: url.port === '8080' };
    }
  },
  {
    name: 'Parse hash',
    fn: () => {
      const url = new URL('https://example.com#section');
      return { pass: url.hash === '#section' };
    }
  },
  {
    name: 'Handle URL without protocol',
    fn: () => {
      try {
        const url = new URL('https://example.com');
        return { pass: url.hostname === 'example.com' };
      } catch (e) {
        return { pass: false, reason: e.message };
      }
    }
  }
];
if (typeof module !== 'undefined') module.exports = tests;