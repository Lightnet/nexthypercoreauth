
const Hyperdrive = require('hyperdrive')
const Hyperbee = require('hyperbee');
const drive = new Hyperdrive('./my-hyperdrive'); // content will be stored in this folder

async function main(){
  await drive.promises.writeFile('/hello.txt', 'world');

  const list = await drive.promises.readdir('/')
  console.log(list) // prints ['hello.txt']

  const data = await drive.promises.readFile('/hello.txt', 'utf-8')
  console.log(data) // prints 'world'
}

main();