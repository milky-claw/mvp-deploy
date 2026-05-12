// Test suite for Image Compressor
// Tests compression ratio calculations and size estimation

const testCases = [
  { origSize: 100000, qual: 80, maxWidth: 1200, desc: '100KB image at 80% quality' },
  { origSize: 500000, qual: 50, maxWidth: 800, desc: '500KB image at 50% quality' },
  { origSize: 1000000, qual: 30, maxWidth: 600, desc: '1MB image at 30% quality' },
  { origSize: 5000, qual: 90, maxWidth: 2000, desc: '5KB small image at high quality' },
];

function estimateCompressedSize(origSize, quality, maxWidth) {
  // Rough estimation based on quality and resize factor
  const qualityFactor = quality / 100;
  const resizeFactor = maxWidth < 1200 ? 0.7 : 1.0;
  // JPEG compression typically achieves 10:1 to 20:1
  const compressionRatio = 15 * qualityFactor;
  const estimated = origSize / compressionRatio * resizeFactor;
  return Math.round(estimated);
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
  return (bytes/(1024*1024)).toFixed(1) + ' MB';
}

console.log('🧪 Image Compressor Tests\n');
let passed = 0;
let failed = 0;

testCases.forEach(tc => {
  const compressed = estimateCompressedSize(tc.origSize, tc.qual, tc.maxWidth);
  const ratio = (compressed / tc.origSize * 100).toFixed(1);
  const savings = (100 - ratio).toFixed(1);
  
  // Test passes if compression actually reduces size
  const testPasses = compressed < tc.origSize;
  const status = testPasses ? '✅ PASS' : '❌ FAIL';
  
  if (testPasses) passed++; else failed++;
  
  console.log(`${status}: ${tc.desc}`);
  console.log(`   Original: ${formatSize(tc.origSize)} -> Est. compressed: ${formatSize(compressed)}`);
  console.log(`   Compression ratio: ${ratio}%, Savings: ${savings}%\n`);
});

console.log(`📊 Results: ${passed} passed, ${failed} failed`);
console.log('\n💡 Note: Real compression depends on image content and browser canvas implementation');