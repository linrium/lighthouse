import React from 'react'
import { Container, Logo, MenuItem } from './AppHeaderStyled'

class AppHeader extends React.PureComponent {
	render() {
		return (
			<Container>
				<Logo>Lighthouse</Logo>
				<MenuItem to="">Explore</MenuItem>
				<MenuItem to="start">Start a project</MenuItem>
				<MenuItem to="">Search</MenuItem>

				<MenuItem to="" style={{marginLeft: 'auto'}}>Notifications</MenuItem>
				<MenuItem to="">Me</MenuItem>

			</Container>
		)
	}
}

export default AppHeader