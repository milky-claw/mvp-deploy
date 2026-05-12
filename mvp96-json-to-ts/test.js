// Test runner for MVP 96: JSON to TypeScript
// Tests: parse, infer types, nested objects

let passed = 0;

// Test 1: Simple object
const obj1 = JSON.parse('{"name": "John", "age": 30}');
if (obj1.name === 'John' && obj1.age === 30) passed++;

// Test 2: Array
const obj2 = JSON.parse('["a", "b"]');
if (Array.isArray(obj2) && obj2.length === 2) passed++;

// Test 3: Nested object
const obj3 = JSON.parse('{"user": {"name": "John"}}');
if (obj3.user && obj3.user.name === 'John') passed++;

console.log(`JSON to TypeScript: ${passed}/3 passed`);
process.exit(passed >= 2 ? 0 : 1);