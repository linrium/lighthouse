import React from 'react'
import { withContext } from '../../_API/withContext'
import {
	Avatar,
	Container,
	Logo,
	MenuItem
} from './AppHeaderStyled'

class AppHeader extends React.PureComponent {

	get isAuth() {
		return this.props.currentCreator.username ? 'flex': 'none'
	}

	get isNotAuth() {
		return this.props.currentCreator.username ? 'none': 'flex'
	}

	render() {
		const {
			currentCreator,
			account
		} = this.props
		return (
			<Container>
				<Logo>Lighthouse</Logo>
				<MenuItem to="">Explore</MenuItem>
				<MenuItem
					to="/start"
					show={this.isAuth}
				>
					Start a project
				</MenuItem>
				<MenuItem
					to="/sign-up"
					show={this.isNotAuth}
				>
					Become creator
				</MenuItem>
				{/*<MenuItem to="">Search</MenuItem>*/}

				{/*<MenuItem to="" style={{marginLeft: 'auto'}}>10 Notifications</MenuItem>*/}
				<MenuItem
					to={`/user/${account}`}
					style={{marginLeft: 'auto'}}
					show={this.isAuth}
				>
					{currentCreator.username}
					<Avatar bgImage={currentCreator.imagePreviewUrl}/>
				</MenuItem>
			</Container>
		)
	}
}

export default withContext([
	'currentCreator',
	'account'
])(AppHeader)