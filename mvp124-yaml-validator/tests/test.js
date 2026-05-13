// Tests for MVP 124 - YAML Validator
const jsyaml = require('js-yaml');
const tests = [
  {
    name: 'Valid simple YAML parses',
    test: () => {
      const yaml = 'name: John\nage: 30';
      try {
        const parsed = jsyaml.load(yaml);
        return parsed.name === 'John' && parsed.age === 30;
      } catch(e) { return false; }
    }
  },
  {
    name: 'Valid YAML with array parses',
    test: () => {
      const yaml = 'items:\n  - one\n  - two';
      try {
        const parsed = jsyaml.load(yaml);
        return Array.isArray(parsed.items) && parsed.items.length === 2;
      } catch(e) { return false; }
    }
  },
  {
    name: 'Invalid YAML throws error',
    test: () => {
      const yaml = 'name: [unclosed';
      try {
        jsyaml.load(yaml);
        return false;
      } catch(e) { return true; }
    }
  },
  {
    name: 'Empty input is valid',
    test: () => {
      try {
        const parsed = jsyaml.load('');
        return parsed === null || parsed === undefined;
      } catch(e) { return false; }
    }
  },
  {
    name: 'Nested objects parse correctly',
    test: () => {
      const yaml = 'user:\n  name: Alice\n  settings:\n    theme: dark';
      try {
        const parsed = jsyaml.load(yaml);
        return parsed.user.name === 'Alice' && parsed.user.settings.theme === 'dark';
      } catch(e) { return false; }
    }
  }
];

// Run tests
let passed = 0;
console.log('Testing MVP 124 - YAML Validator\n');
tests.forEach(t => {
  const result = t.test();
  console.log(`${result ? '✓' : '✗'} ${t.name}`);
  if (result) passed++;
});
console.log(`\nResult: ${passed}/${tests.length} tests passed`);
process.exit(passed === tests.length ? 0 : 1);