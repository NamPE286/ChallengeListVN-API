const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path');
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())


function *walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

for (const filePath of walkSync('./src')) {
  var procPath = filePath.substring(3)
  var a = procPath.split('\\')
  var type = a.at(-1).replace('.js', '')
  a.pop()
  procPath = a.join('/')
  if(!procPath){
    procPath = '/'
  }
  console.log(procPath)
  if(type == 'GET'){
    app.get(procPath, require(`./src${procPath}/${type}.js`))
  }
  if(type == 'POST'){
    app.post(procPath, require(`./src${procPath}/${type}.js`))
  }
  if(type == 'PUT'){
    app.put(procPath, require(`./src${procPath}/${type}.js`))
  }
  if(type == 'DELETE'){
    app.delete(procPath, require(`./src${procPath}/${type}.js`))
  }
}

app.listen(
    process.env.EXPRESS_PORT,
    () => {
        console.log(`Server running on http://localhost:${process.env.EXPRESS_PORT}`)
    }
)