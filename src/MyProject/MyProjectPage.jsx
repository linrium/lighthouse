import React from 'react'
import {
	Container,
	Wrapper
} from './MyProjectStyled'

class MyProjectPage extends React.PureComponent {
	render() {
		return (
			<Container>
				<Wrapper>
					<h1>Hello my projects</h1>
				</Wrapper>
			</Container>
		)
	}
}

export default MyProjectPage