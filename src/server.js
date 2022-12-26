//
// This module is the server to be called from within the lambda
//
import fs from 'fs';
import path from 'path'
import express from 'express'
import React from 'react'
import ReactDOMServer, { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import App from './App'
import { routes } from './routes'

require('dotenv').config()

const app = express()

// Set view engine & serve static assets
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..'))
app.use('/static', express.static(path.join(__dirname, '..', 'static')))
if (process.env.REACT_APP_LOCAL == 'true'){
	app.use('/', express.static(path.join(__dirname, '..')))
}
else{
	app.use('/prod', express.static(path.join(__dirname, '..')))
	app.use('/', express.static(path.join(__dirname, '..')))
}

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
	const branch = matchRoutes(routes, req.url)
	const promises = []

	branch.forEach( ({route, match}) => {
		if (route.loadData) // fetching data
			promises.push(route.loadData(match))
	})

	Promise.all(promises).then(data => {
		const context = data.reduce( (context, data) => {
			return Object.assign(context, data)
		}, {})

		const content = renderToString(
			<StaticRouter location={req.url} context={context} >
				<App/>
			</StaticRouter>
		)

// Server-side debug message
//console.log('[DBG] Server-side rendered page: '+content)

		if(context.url) {
			res.writeHead(301, {Location: context.url})
			res.end()
		}
		return res.render('index', {content})
	})
})

module.exports = app;
