const http = require('http')
const fs = require('fs').promises
const url = require('url')
const path = require('path')

const contentType = {
  '.html': 'text/html'
}

http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url)
  let filename = pathname.substring(1)
  if (pathname === '/') {
    filename = 'index.html'
  }
  const type = contentType[path.extname(filename)]
  res.writeHead(200, { 'Content-Type': type })
  const content = await fs.readFile(filename, 'utf8')
  res.write(content)
  res.end()
}).listen(3001, () => console.log('Listen server on port 3001'))