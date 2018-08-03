var express = require('express')
var app = express()

const PORT = 3337

app.get('/', function(request, response) {
    response.send(request.params)
})

console.log("Running on port " + PORT)

app.listen(PORT)
