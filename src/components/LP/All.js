import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { polyfill }  from 'es6-promise'
import fetch from 'isomorphic-fetch'

polyfill()

require('dotenv').config()

class LPAll extends Component {
	constructor(props) {
		super(props)
		this.state = this.props.staticContext || { lps: [] }
	}

	componentDidMount() {
		console.log('fetching client-side. Local = '+process.env.REACT_APP_LOCAL)
		var location = ''
		if (process.env.REACT_APP_LOCAL == 'true'){
			location = '/lps.json'
		}
		else {
			location = '../prod/lps.json'
		}

		fetch(location)
		.then(res => res.json())
		.then((json) => {
			this.setState({
				lps: json.lps
			})
		})
	}

	render() {
		let lps = this.state.lps.map(lp => (
			<li key={lp.id}>
				<Link to={`/lps/${lp.slug}`}><b>{lp.title}</b></Link> by <em>{lp.band}</em>, released on <em>{lp.year}</em>.
			</li>
		))
		return (
			<div>
				<div>
					<h2>LPs</h2>
					<ul>{lps}</ul>
				</div>
			</div>
		)
	}
}

export default LPAll
