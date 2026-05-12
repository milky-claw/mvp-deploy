// Test file for MVP 122 - Text Sorter
function sortAlpha(arr) {
  return [...arr].sort((a, b) => a.localeCompare(b));
}

function sortReverse(arr) {
  return [...arr].reverse();
}

function unique(arr) {
  return [...new Set(arr)];
}

function uniqueCaseInsensitive(arr) {
  const seen = new Map();
  return arr.filter(item => {
    const lower = item.toLowerCase();
    if (seen.has(lower)) return false;
    seen.set(lower, true);
    return true;
  });
}

function sortByLength(arr) {
  return [...arr].sort((a, b) => a.length - b.length);
}

let passed = 0;
const failed = [];

// Test 1: Sort alphabetical
const result1 = sortAlpha(['cherry', 'apple', 'banana']);
if (result1[0] === 'apple' && result1[1] === 'banana' && result1[2] === 'cherry') {
  console.log('✅ Test 1: Sort alphabetical');
  passed++;
} else {
  failed.push('Test 1');
}

// Test 2: Sort reverse
const result2 = sortReverse(['a', 'b', 'c']);
if (result2[0] === 'c' && result2[2] === 'a') {
  console.log('✅ Test 2: Sort reverse');
  passed++;
} else {
  failed.push('Test 2');
}

// Test 3: Unique values
const result3 = unique(['a', 'b', 'a', 'c']);
if (result3.length === 3 && result3[0] === 'a') {
  console.log('✅ Test 3: Unique values');
  passed++;
} else {
  failed.push('Test 3');
}

// Test 4: Case insensitive unique
const result4 = uniqueCaseInsensitive(['Apple', 'apple', 'APPLE']);
if (result4.length === 1) {
  console.log('✅ Test 4: Case insensitive unique');
  passed++;
} else {
  failed.push('Test 4');
}

// Test 5: Sort by length
const result5 = sortByLength(['abc', 'a', 'ab']);
if (result5[0] === 'a' && result5[1] === 'ab' && result5[2] === 'abc') {
  console.log('✅ Test 5: Sort by length');
  passed++;
} else {
  failed.push('Test 5');
}

console.log(`\n📊 Results: ${passed}/5 passed`);
if (failed.length > 0) {
  console.log('❌ Failed:', failed.join(', '));
  process.exit(1);
}

module.exports = { passed: 5 };