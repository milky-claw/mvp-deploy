// Test file for MVP 123 - CSV to JSON
function csvToJson(csv, hasHeader = true, delimiter = ',') {
  const rows = csv.trim().split('\n').map(r => r.split(delimiter).map(c => c.trim()));
  if (rows.length < 2) return [];
  
  let keys;
  if (hasHeader) {
    keys = rows[0];
    rows.shift();
  } else {
    keys = rows[0].map((_, i) => 'col' + (i + 1));
  }
  
  return rows.map(row => {
    const obj = {};
    keys.forEach((key, i) => { obj[key] = row[i] || ''; });
    return obj;
  });
}

let passed = 0;
const failed = [];

// Test 1: Basic CSV with header
const result1 = csvToJson('name,age\nJohn,30\nJane,25');
if (result1.length === 2 && result1[0].name === 'John' && result1[0].age === '30') {
  console.log('✅ Test 1: Basic CSV with header');
  passed++;
} else {
  failed.push('Test 1');
}

// Test 2: CSV without header
const result2 = csvToJson('John,30\nJane,25', false);
if (result2[0].col1 === 'John' && result2[1].col2 === '25') {
  console.log('✅ Test 2: CSV without header');
  passed++;
} else {
  failed.push('Test 2');
}

// Test 3: Semicolon delimiter
const result3 = csvToJson('name;age\nJohn;30', true, ';');
if (result3[0].name === 'John' && result3[0].age === '30') {
  console.log('✅ Test 3: Semicolon delimiter');
  passed++;
} else {
  failed.push('Test 3');
}

// Test 4: Empty cells
const result4 = csvToJson('a,b,c\n1,,3\n,2,');
if (result4[0].b === '' && result4[1].a === '') {
  console.log('✅ Test 4: Empty cells handled');
  passed++;
} else {
  failed.push('Test 4');
}

// Test 5: Arrays have correct keys
const result5 = csvToJson('x,y,z\n1,2,3');
if (result5[0].x === '1' && result5[0].y === '2' && result5[0].z === '3') {
  console.log('✅ Test 5: All keys present');
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