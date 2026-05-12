// Test Suite: Base64 Encoder/Decoder
const tests = [
  {
    name: "Encode plain text",
    fn: () => {
      document.getElementById('input').value = "Hello";
      encode();
      return document.getElementById('output').value === "SGVsbG8=";
    }
  },
  {
    name: "Decode plain text",
    fn: () => {
      document.getElementById('input').value = "SGVsbG8=";
      decode();
      return document.getElementById('output').value === "Hello";
    }
  },
  {
    name: "Encode Unicode",
    fn: () => {
      document.getElementById('input').value = "čia";
      encode();
      return document.getElementById('output').value === "Y2lhw6k=";
    }
  },
  {
    name: "Error on invalid Base64",
    fn: () => {
      document.getElementById('input').value = "not-valid-base64!";
      decode();
      return document.getElementById('output').value.includes("Error");
    }
  }
];

let passed = 0;
tests.forEach(t => {
  const result = t.fn();
  console.log(`${result ? '✓' : '✗'} ${t.name}`);
  if (result) passed++;
});
console.log(`\n${passed}/${tests.length} tests passed`);