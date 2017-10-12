'use strict'
const http = require('http')
const url = require('url')

const IP = '127.0.0.1'
const PORT = 8000

const ARTICLES = {
  1: {
    headline: 'This is the first article',
    author: 'Foobar Johnson',
    body: [
      'This is the first paragraph it is pretty cool',
      'This is the second paragraph it is also pretty cool'
    ]
  },
  2: {
    headline: 'This is the second article',
    author: 'Foobar Johnson',
    body: [
      'This is the first paragraph it is pretty cool',
      'This is the second paragraph it is also pretty cool'
    ]
  }
}

const server = http.createServer(function (req, res) {
  if (req.method === 'GET') {
    const parsedUrl = url.parse(req.url)
    const pathname = parsedUrl.pathname

    const [ collection, id ] = pathname.slice(1).split('/')

    let status = 404
    let data = 'Not Found'

    if (collection === 'articles' && !!ARTICLES[id]) {
      status = 200
      data = JSON.stringify(ARTICLES[id])
    }

    res.writeHead(status, {
      'Content-Type': 'application/json'
    })

    res.end(data)
  }
})

console.log(`Listening on http://${IP}:${PORT}`)
server.listen(PORT, IP)
