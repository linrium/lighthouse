import {
	Route,
	Switch
} from 'react-router-dom'
import React from 'react'
import HomeContainer from './Home/HomeContainer'
import ProjectContainer from './Project/ProjectContainer'
import StartContainer from './Start/StartContainer'
import SignUpContainer from './SignUp/SignUpContainer'
import UserContainer from './User/UserContainer'

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
	{
		path: '/sign-up',
		exact: true,
		main: () => <SignUpContainer/>
	},
	{
		path: '/user/:userId',
		exact: true,
		main: () => <SignUpContainer/>
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