import Home from './components/Home'
import LP from './components/LP/'
import LPAll from './components/LP/All'
import LPSingle from './components/LP/Single'
import About from './components/About'
import RedirectWithStatus from './components/RedirectWithStatus'
import NotFound from './components/NotFound'
import { polyfill }  from 'es6-promise'
import fetch from 'isomorphic-fetch'

polyfill()

require('dotenv').config()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Custom function to load the data on the server-side
const loadData = async () => {
	// Alert a warning if not an absolute url
	// TODO change it!
	console.log('Fetching server-side. Local = '+process.env.REACT_APP_LOCAL)
  var location = ''
	location = process.env.PUBLIC_URL+'/lps.json'

	var result = fetch(location).then(res => res.json(), reason => {console.log(reason)})
	await sleep(5000);
	console.log('Fetched!')
	return result;
};

export const routes = [
	{ path: '/',
		exact: true,
		component: Home,
	},
	{ path: '/lps',
		component: LP,
		routes: [
			{
				path: '/lps',
				exact: true,
				component: LPAll,
				loadData: loadData
			},
			{
				path: '/lps/:slug',
				component: LPSingle,
				loadData: loadData
			}
		]
	},
	{ path: '/about',
		component: About,

	},
	{
		path: '/eps',
		component: RedirectWithStatus,
		status: 301,
		to: '/lps'
	},
	{
		path: '*',
		component: NotFound
	}
]
