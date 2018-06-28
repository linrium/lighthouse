import {
	Route,
	Switch
} from 'react-router-dom'
import React from 'react'
import Home from './Home/Home'
import Start from './Start/Start'

export const routes = [
	{
		path: '/',
		exact: true,
		main: () => <Home/>
	},
	{
		path: '/start',
		exact: true,
		main: () => <Start/>
	},
]

export const RouterContent = () => (
	<Switch>
		{
			routes.map((route, index) => (
				<Route
					key={index}
					path={route.path}
					exact={route.exact}
					component={route.main}
				/>
			))
		}
	</Switch>
)