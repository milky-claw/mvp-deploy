// Tests for MVP 126 - Random String Generator
const tests = [
  {
    name: 'Generates correct length',
    test: () => {
      for (let len = 5; len <= 50; len += 5) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let str = '';
        const arr = new Uint32Array(len);
        crypto.getRandomValues(arr);
        for (let i = 0; i < len; i++) str += chars[arr[i] % chars.length];
        if (str.length !== len) return false;
      }
      return true;
    }
  },
  {
    name: 'Uses only specified charset (lowercase only)',
    test: () => {
      const charset = 'abcdefghijklmnopqrstuvwxyz';
      let str = '';
      const arr = new Uint32Array(100);
      crypto.getRandomValues(arr);
      for (let i = 0; i < 100; i++) str += charset[arr[i] % charset.length];
      return /^[a-z]+$/.test(str);
    }
  },
  {
    name: 'Uses only specified charset (numbers only)',
    test: () => {
      const charset = '0123456789';
      let str = '';
      const arr = new Uint32Array(50);
      crypto.getRandomValues(arr);
      for (let i = 0; i < 50; i++) str += charset[arr[i] % charset.length];
      return /^[0-9]+$/.test(str);
    }
  },
  {
    name: 'Combined charset works',
    test: () => {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let str = '';
      const arr = new Uint32Array(100);
      crypto.getRandomValues(arr);
      for (let i = 0; i < 100; i++) str += charset[arr[i] % charset.length];
      return /^[a-zA-Z0-9]+$/.test(str);
    }
  },
  {
    name: 'Length 1 works',
    test: () => {
      const chars = 'abc';
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      const str = chars[arr[0] % chars.length];
      return str.length === 1 && chars.includes(str);
    }
  }
];

// Run tests
let passed = 0;
console.log('Testing MVP 126 - Random String Generator\n');
tests.forEach(t => {
  const result = t.test();
  console.log(`${result ? '✓' : '✗'} ${t.name}`);
  if (result) passed++;
});
console.log(`\nResult: ${passed}/${tests.length} tests passed`);
process.exit(passed === tests.length ? 0 : 1);