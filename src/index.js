import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

if (process.env.REACT_APP_LOCAL == 'true'){
	render((
		<BrowserRouter>
			<App />
		</BrowserRouter>
	), document.getElementById('root'))
}
else {
	render((
		<BrowserRouter basename="/prod">
			<App />
		</BrowserRouter>
	), document.getElementById('root'))
}
