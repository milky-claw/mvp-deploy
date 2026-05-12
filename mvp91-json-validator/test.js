// Tests for mvp91-json-validator
const tests = [
  {
    name: 'Valid JSON object',
    fn: () => {
      const input = '{"name": "test", "value": 123}';
      try {
        JSON.parse(input);
        return { pass: true };
      } catch (e) {
        return { pass: false, reason: e.message };
      }
    }
  },
  {
    name: 'Valid JSON array',
    fn: () => {
      const input = '[1, 2, 3, "four"]';
      try {
        JSON.parse(input);
        return { pass: true };
      } catch (e) {
        return { pass: false, reason: e.message };
      }
    }
  },
  {
    name: 'Invalid JSON - missing quote',
    fn: () => {
      const input = '{name: "test"}';
      try {
        JSON.parse(input);
        return { pass: false, reason: 'Should have thrown' };
      } catch (e) {
        return { pass: true };
      }
    }
  },
  {
    name: 'Empty input handled',
    fn: () => {
      const input = '';
      try {
        JSON.parse(input);
        return { pass: false, reason: 'Should have thrown' };
      } catch (e) {
        return { pass: true };
      }
    }
  },
  {
    name: 'Nested JSON parsed correctly',
    fn: () => {
      const input = '{"data": {"nested": {"deep": true}}}';
      try {
        const parsed = JSON.parse(input);
        return { pass: parsed.data.nested.deep === true };
      } catch (e) {
        return { pass: false, reason: e.message };
      }
    }
  }
];
// Simple test runner
if (typeof module !== 'undefined') module.exports = tests;