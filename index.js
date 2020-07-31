/*const Person = require('./person');
const person1 = new Person('Jay Soni', 30);
person1.greeting();
const Logger = require('./logger');
const logger = new Logger();
logger.on('message',(data)=> console.log('Called Listener',data));

logger.log('Hello World');*/
const http =require('http');
const path = require('path');
const fs = require('fs');

const  server = http.createServer((req,res)=>{

  /*
if(req.url ==='/'){
  
  fs.readFile(path.join(__dirname,'public','index.html'),(err,content)=>
  {
    if(err) throw err;
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end(content);
  })
  
}
});
*/
//Build file path
let filePath = path.join(__dirname,'public',req.url === '/'?'index.html':req.url);
//Entension of file
let extname = path.extname(filePath);
//Initial content Type
let contentType = 'text/html';
//Check ext and set content Type
switch(extname){
  case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
}
//Read file
fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});
const PORT = process.env.port || 5000;

server.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
