'use strict'
const http = require('http')
const url = require('url')
const render = require('./render')

const IP = '127.0.0.1'
const PORT = 8080

const server = http.createServer(function (req, res) {
  if (req.method === 'GET') {
    const parsedUrl = url.parse(req.url)
    const pathname = parsedUrl.pathname

    const [ collection, id ] = pathname.slice(1).split('/')

    if (collection === 'articles') {
      http.get(`http://127.0.0.1:8000/articles/${id}`, function (response) {
        let body

        response.setEncoding('utf8')
        response.on('data', function (data) {
          body = JSON.parse(data)
        })
        response.on('end', function () {
          res.writeHead(200, {
            'Content-Type': 'text/html'
          })
          res.end(render(body))
        })
      })
    }
  }
})

console.log(`Listening on http://${IP}:${PORT}`)
server.listen(PORT, IP)
