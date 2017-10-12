'use strict'

function render (data) {
  const paragraphs = data.body.map(function (text) {
    return `<p>${text}</p>`
  }).join('')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${data.headline}</title>
      </head>
      <body>
        <h1>${data.headline}</h1>
        <h2>by ${data.author}</h2>
        ${paragraphs}
      </body>
    </html>
  `
}

module.exports = render
