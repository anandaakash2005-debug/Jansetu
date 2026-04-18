const fs = require('fs');

const rawHtml = fs.readFileSync('app/login/index.html', 'utf8');
const styleMatch = rawHtml.match(/<style>([\s\S]*?)<\/style>/);
let css = styleMatch ? styleMatch[1] : '';

// Replace body with .login-wrapper
css = css.replace(/body\s*{/g, '.login-wrapper {\n  height: 100vh;\n  width: 100vw;\n');

fs.writeFileSync('app/login/login.css', css);

const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<script>/);
let bodyHtml = bodyMatch ? bodyMatch[1] : '';

fs.writeFileSync('app/login/login-content.ts', `export const loginHtml = ${JSON.stringify(bodyHtml)};`);
console.log('Generated login.css and login-content.ts');
