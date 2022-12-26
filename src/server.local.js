//
// This module is the server to be called for local development
//
'use strict'

const app = require('./views/server');

// Run server
const port = process.env.PORT || 3000
app.listen(port, err => {
	if (err) return console.error(err)
	console.log(`Server listening at http://localhost:${port}`)
})
