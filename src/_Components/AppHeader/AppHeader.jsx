import React from 'react'
import { Container, Logo, MenuItem } from './AppHeaderStyled'

class AppHeader extends React.PureComponent {
	render() {
		return (
			<Container>
				<Logo>Lighthouse</Logo>
				<MenuItem>Explore</MenuItem>
				<MenuItem>Start a project</MenuItem>
				<MenuItem>Search</MenuItem>

				<MenuItem style={{marginLeft: 'auto'}}>Notifications</MenuItem>
				<MenuItem>Me</MenuItem>

			</Container>
		)
	}
}

export default AppHeader