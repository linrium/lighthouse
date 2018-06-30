import React from 'react'
import {
	Container,
	Wrapper
} from './UserStyled'

class UserPage extends React.PureComponent {
	render() {
		return (
			<Container>
				<Wrapper>
					<h1>Hello</h1>
				</Wrapper>
			</Container>
		)
	}
}

export default UserPage