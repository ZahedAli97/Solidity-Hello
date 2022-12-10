const path = require('path'); // Standard JS module, no need for npm install, path works for all OS
const fs = require('fs'); // Standard JS module, no need for npm install
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol') //__dirname is current filename
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];

// //{ contracts:
// { ':Inbox':
// { assembly: [Object],
//   bytecode:

//  Aboce is how solc compiles the code to