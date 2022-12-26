import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { polyfill }  from 'es6-promise'
import fetch from 'isomorphic-fetch'

polyfill()

require('dotenv').config()

class LPSingle extends Component {
	constructor (props) {
		super(props)
		let lp = {}
		let slug = this.props.match.params.slug

		// Set 'lp' if it’s on server-side
		if (this.props.staticContext) {
			 lp = this.props.staticContext.lps.find(lp => lp.slug === slug)
		}

		this.state = { lp: lp, slug: slug }
	}

	componentDidMount () {
		let slug = this.state.slug
		var location = ''
		if (process.env.REACT_APP_LOCAL == 'true'){
			location = '/lps.json'
		}
		else {
			location = '../../prod/lps.json'
		}

		fetch(location)
		.then(res => res.json())
		.then((json) => {
			let lp = json.lps.find(lp => lp.slug === slug)
			this.setState({lp: lp})
		})
	}

	render () {
		let lp = this.state.lp
		return (
			<div>
				<h3>{lp.title}</h3>
				<h5 style={{textAlign: 'right'}}><em>{lp.band}</em></h5>
				<p>{lp.description}</p>
				<p><em>Released on {lp.year}</em></p>
				<br/>
				<p><Link to='/lps'>Back to all LPs</Link></p>
			</div>
		)
	}
}

export default LPSingle
