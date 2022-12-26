import React from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

const LP = ({route}) => (
	<Switch>
		{renderRoutes(route.routes)}
	</Switch>
)

export default LP
