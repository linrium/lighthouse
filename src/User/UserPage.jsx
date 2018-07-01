import React from 'react'
import {
	Container,
	Wrapper
} from './UserStyled'

class UserPage extends React.PureComponent {
	render() {
		const {user} = this.props
		return (
			<Container>
				<Wrapper>
					<div>
						<p>{user.username}</p>
						<p>{user.email}</p>
						<p>{user.address}</p>
						<p>{user.biography}</p>
					</div>
				</Wrapper>
			</Container>
		)
	}
}

export default UserPage