import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
	<header>
		<h1>Server-side Lambda</h1>
		<nav>
			<ul>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/lps'>LPs</Link></li>
				<li><Link to='/about'>About</Link></li>
				<li><Link to='/eps'>EPs/Redirect</Link></li>
				<li><Link to='/foo'>404</Link></li>
			</ul>
		</nav>
	</header>
)

export default Header
