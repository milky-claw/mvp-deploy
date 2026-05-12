// Test runner for MVP 52: Morse Code Translator
const tests = [];

// Encode tests
function testEncode(text, expected) {
  const morseCode = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/' };
  const result = text.toUpperCase().split('').map(c => morseCode[c] || c).join(' ');
  const passed = result === expected;
  tests.push({ name: `encode "${text}"`, expected, result, passed });
}

// Decode tests
function testDecode(morse, expected) {
  const morseCode = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----' };
  const reverseMorse = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));
  const result = morse.split(' ').map(c => reverseMorse[c] || c).join('').toUpperCase();
  const passed = result === expected;
  tests.push({ name: `decode "${morse}"`, expected, result, passed });
}

// Run tests
testEncode('SOS', '... --- ...');
testEncode('HELLO', '.... . .-.. .-.. ---');
testDecode('... --- ...', 'SOS');
testDecode('.... . .-.. .-.. ---', 'HELLO');
testEncode('A', '.-');
testDecode('.-', 'A');

// Report
console.log('\n=== Morse Code Translator Tests ===\n');
let passed = 0;
tests.forEach(t => {
  const status = t.passed ? '✅' : '❌';
  console.log(`${status} ${t.name}`);
  if (!t.passed) console.log(`   Expected: ${t.expected}`);
  if (!t.passed) console.log(`   Got:      ${t.result}`);
  if (t.passed) passed++;
});
console.log(`\n${passed}/${tests.length} tests passed`);