import {
	Route,
	Switch
} from 'react-router-dom'
import React from 'react'
import HomeContainer from './Home/HomeContainer'
import ProjectContainer from './Project/ProjectContainer'
import StartContainer from './Start/StartContainer'

export const routes = [
	{
		path: '/',
		exact: true,
		main: () => <HomeContainer/>
	},
	{
		path: '/project/:projectId',
		exact: true,
		main: () => <ProjectContainer/>
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