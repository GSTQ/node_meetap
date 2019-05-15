const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.)
  for (let i = 0; i < numCPUs; i++) {
    cluster.schedulingPolicy = cluster.SCHED_NONE;
    cluster.fork();
  }
  console.log(`created ${numCPUs} workers`);

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    let workerName = `worker ${process.pid}`;
    res.end(`hello world from worker ${workerName}`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}