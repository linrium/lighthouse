import React from 'react'
import {
	Route,
	Switch
} from 'react-router-dom'
import HomeContainer from './Home/HomeContainer'
import MyProjectContainer from './MyProject/MyProjectContainer'
import ProjectContainer from './Project/ProjectContainer'
import SignUpContainer from './SignUp/SignUpContainer'
import StartContainer from './Start/StartContainer'
import TransactionContainer from './Transaction/TransactionContainer'

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
	{
		path: '/user/:userId/transactions',
		exact: true,
		main: () => <TransactionContainer/>
	},
	{
		path: '/user/:userId/projects',
		exact: true,
		main: () => <MyProjectContainer/>
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