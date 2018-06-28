import {
	Route,
	Switch
} from 'react-router-dom'
import React from 'react'
import HomePage from './Home/HomePage'
import ProjectPage from './Project/ProjectPage'
import StartContainer from './Start/StartContainer'

export const routes = [
	{
		path: '/',
		exact: true,
		main: () => <HomePage/>
	},
	{
		path: '/project/:projectId',
		exact: true,
		main: () => <ProjectPage/>
	},
	{
		path: '/start',
		exact: true,
		main: () => <StartContainer/>
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