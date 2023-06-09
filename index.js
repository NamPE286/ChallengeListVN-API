require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 5050

app.use(express.json())
app.use(cors())

function* walkSync(dir) {
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
  var reqPath = './' + filePath
    .split('\\')
    .join('/')
    .slice(0, -3)
  var route = '/' + reqPath
    .split('/')
    .slice(2, -1)
    .join('/')
    .replaceAll('[', ':')
    .replaceAll(']', '')
    .replaceAll('{', ':')
    .replaceAll('}', '?')
  if (reqPath.endsWith('GET', reqPath.length)) {
    app.get(route, require('./middleware/setCaching'), require(reqPath))
  }
  if (reqPath.endsWith('POST', reqPath.length)) {
    app.post(route, require('./middleware/checkUser'), require(reqPath))
  }
  if (reqPath.endsWith('PUT', reqPath.length)) {
    app.put(route, require('./middleware/checkUser'), require(reqPath))
  }
  if (reqPath.endsWith('DELETE', reqPath.length)) {
    app.delete(route, require('./middleware/checkUser'), require(reqPath))
  }
  console.log(`Loaded path ${reqPath} to route ${route}`)
}

app.listen(
  PORT,
  () => {
    console.log(`Server running on http://localhost:${PORT}`)
  }
)