const fs = require('fs');

console.log("start app");

setTimeout(() => console.log("set timeout 1"), 0); //(1)

setImmediate(() => console.log("setImmediate 1")); //(2)

Promise.resolve().then(()=>
{
  console.log("promise"); // 3
});

fs.readFile(__filename, () => {
  console.log("read file"); // (4)
  setTimeout(() => console.log("set timeout 2"), 0); // (5)
  setImmediate(() => console.log("setImmediate 2")); // (6)
  process.nextTick(() => console.log("next tick")); // (7)
});

setTimeout(() => console.log("set timeout 3"), 0); // (8)

console.log("end app");