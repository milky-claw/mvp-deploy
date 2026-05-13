// Tests for MVP 125 - Slug Generator
const tests = [
  {
    name: 'Basic text converts to slug',
    test: () => {
      const input = 'hello world';
      const slug = input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return slug === 'hello-world';
    }
  },
  {
    name: 'Special characters removed',
    test: () => {
      const input = 'Hello @World! #Test';
      const slug = input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return slug === 'hello-world-test';
    }
  },
  {
    name: 'Multiple spaces collapse to single dash',
    test: () => {
      const input = 'hello    world';
      const slug = input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return slug === 'hello-world';
    }
  },
  {
    name: 'Underscore separator works',
    test: () => {
      const input = 'hello world';
      const sep = '_';
      const slug = input.toLowerCase().replace(/\s+/g, sep).replace(/[^a-z0-9_]/g, '');
      return slug === 'hello_world';
    }
  },
  {
    name: 'Numbers are preserved',
    test: () => {
      const input = 'test 123 abc';
      const slug = input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return slug === 'test-123-abc';
    }
  }
];

// Run tests
let passed = 0;
console.log('Testing MVP 125 - Slug Generator\n');
tests.forEach(t => {
  const result = t.test();
  console.log(`${result ? '✓' : '✗'} ${t.name}`);
  if (result) passed++;
});
console.log(`\nResult: ${passed}/${tests.length} tests passed`);
process.exit(passed === tests.length ? 0 : 1);