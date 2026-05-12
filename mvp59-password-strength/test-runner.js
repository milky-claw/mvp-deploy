// Test runner for Password Strength MVP
// The app uses event listener, so we trigger input events manually
const tests = [
  { name: 'Empty password shows default', fn: () => {
    const password = document.getElementById('password');
    password.value = '';
    password.dispatchEvent(new Event('input'));
    return document.getElementById('strength').textContent === 'Enter a password';
  }},
  { name: 'Short weak password', fn: () => {
    const password = document.getElementById('password');
    password.value = 'abc';
    password.dispatchEvent(new Event('input'));
    return document.getElementById('strength').textContent === 'Very Weak';
  }},
  { name: 'Strong password passes', fn: () => {
    const password = document.getElementById('password');
    password.value = 'Str0ng!Pass#2024';
    password.dispatchEvent(new Event('input'));
    return document.getElementById('strength').textContent === 'Strong';
  }}
];
console.log('Password Strength Tests:', tests.map(t => ({ name: t.name, pass: t.fn() })));